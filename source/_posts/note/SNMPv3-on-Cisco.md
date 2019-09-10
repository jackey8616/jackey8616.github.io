---
title: SNMPv3 on Cisco switch(2950/2960/3850)
date: 2018-11-03 23:34:26
tags:
  - Note
  - Cisco
  - 2950
  - 2960
  - 3850
categories: Note
---

謹紀錄在做專題的時候，踩過的SNMP設定小坑。
<!-- More -->

# Check setup in switch
```
Switch# show snmp ?
```
Any command with `no` to remove it.

# Setups
## Group
```
Switch(config)# snmp-server group [groupName] v3 [auth | noauth | priv] [read read-view] [write write-view] [notify notify-view] [access access-list] 
```

## User
```
authNoPriv
Switch(config)# snmp-server user [userName] [groupName] [remote ip-address [udp-port port]] [encrypted] v3 [auth {md5 | sha}]
authPriv
Switch(config)# snmp-server user [userName] [groupName] [remote ip-address [udp-port port]] [encrypted] v3 [auth {md5 | sha} auth-password] [priv {3des|aes 128|aes 192|aes 256|des} pass]
```

## View
```
Switch(config)# snmp-server view view-name oid-tree {included|excluded}
```

# Traps
先依序設定好Group跟User。  
```
# 設定接收Notification的Server位置
# 如果最後面Trap Type留空，預設所有的Trap都會發送。
Switch(config)# snmp-server host [ip or domain] version 3 priv [user name] [trap type]
```

## Debugging
```
Switch# debug snmp packets
```


# Reference
[Cisco Wiki SNMPv3](http://docwiki.cisco.com/wiki/Snmp_v3_configurations)
[SNMPSecurity](https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/20370-snmpsecurity-20370.html)
[SNMP XE 3SE (Catalyst 3850)](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/snmp/configuration/xe-3se/3850/snmp-xe-3se-3850-book/nm-snmp-snmpv3.html)
[Clean Access Server Configuration Guide, Release 4.9(x)](https://www.cisco.com/c/en/us/td/docs/security/nac/appliance/configuration_guide/49x/cas/49xcas-book/s_apx_mib.html)
[Catalyst 2950 Desktop Switch Software Configuration Guide, 12.1(11)YJ4](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst2950/software/release/12-1_11_yj4/configuration/guide/lrescg.html)
[Cisco设备SNMP配置(思科SNMP配置)](http://www.zhetao.com/content89)
[SNMP MIBs](http://mibs.snmplabs.com/asn1/)
