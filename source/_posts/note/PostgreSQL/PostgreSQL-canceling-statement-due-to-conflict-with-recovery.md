---
title: "PostgreSQL: canceling statement due to conflict with recovery"
date: 2023-08-01 13:29:36
categories: PostgreSQL
tags:
  - PostgreSQL
  - RDBMS
  - Vacuum
---

過長的Replica節點查詢，因爲Primary節點執行`vacuum`指令導致列版本(row version)分岔，
進一步引起查詢取消。

<!-- More -->

# TL;DR
- 避免過久的查詢
- 開啟 `hot_standby_feedback` 參數（缺點：primary node會有表膨脹的問題）

# What is vacuum?
- 恢復或回收使用因更新或刪除資料列所佔用的磁碟空間。
- 更新 PostgreSQL 查詢計劃器使用的資料統計資訊。
- 更新可視性結構，這會增加索引限定掃描的效率。
- 防止由於事務 ID 重覆或 multixact ID 重覆而失去非常舊的資料。
[Ref](https://docs.postgresql.tw/server-administration/routine-database-maintenance-tasks/routine-vacuuming)

# What happens when vacuum execute with long query?
- 1. Replica節點執行SELECT長查詢，假設其中包含Row-A。
- 2. Primary節點恰好在Replica節點查詢結束前執行vacuum指令，並移除Row-A。
  - 為何移除Row-A：
    該列可能於第一項Replica節點執行查詢前，已經刪除並被標記(mark)為須回收，故vacuum會移除該行。
- 3. Replica節點同步執行vacuum指令。
- 4. 第一項SELECT長查詢Row-A與vacuum指令的列版本(row version)發生衝突，自動取消(cancel)。

# Solution：hot_standby_feedback
[Ref](https://www.postgresql.org/docs/current/runtime-config-replication.html#RUNTIME-CONFIG-REPLICATION-STANDBY)  
此參數設定於Replica節點，  
啟用這個參數讓Replica節點在接收到查詢時，同步被查的行資訊給Primary節點，避免`vacuum`清除這些節點的資訊。
用於避免`vacuum`導致查詢被取消。

缺點：
有可能會導致表膨脹(Table bloat)，因為被Replica節點查詢佔用的行資訊沒有被清除。

# Reference
- [PostgreSQL Vacuum](https://docs.postgresql.tw/server-administration/routine-database-maintenance-tasks/routine-vacuuming)
- [PostgreSQL Standby Server](https://www.postgresql.org/docs/current/runtime-config-replication.html#RUNTIME-CONFIG-REPLICATION-STANDBY)
