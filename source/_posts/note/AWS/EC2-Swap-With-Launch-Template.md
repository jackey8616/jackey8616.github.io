---
title: Use EBS as Swap at EC2
date: 2023-07-11 22:48:49
categories: AWS
tags:
  - AWS
  - ECS
  - EC2
  - EBS
---

在使用Amazon Linux AMI中的EC2使用EBS作為Swap。
並結合Launch Template。
<!-- More -->

# Opening
Amazon提供的EC2 optimize Linux預設是沒有開啟Swap的，
所以需要手動開啟。

# Manual
以手動開啟為例，首先EC2要具備連入能力。
這邊不多贅述，可以自行搜尋EC2以SSH連入或是SessionManager等。

## Check Swap
檢查Swap是否開啟的指令。
```bash
$ swapon -s
Filename                                Type            Size    Used    Priority
/dev/nvme1n1                            partition       10485756        5120    -2
```

## List block devices
列出目前所有的Disk以及Partition。
```bash
$ lsbsk
NAME          MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
nvme1n1       259:0    0  10G  0 disk [SWAP]
nvme0n1       259:1    0  30G  0 disk
├─nvme0n1p1   259:2    0  30G  0 part /
└─nvme0n1p128 259:3    0   1M  0 part
```
上圖為兩個EBS Volume分別為30G以及10G。
30G做為系統碟掛載在root，10G做為Swap磁區。

### Hint: nvme1n1
構建在Nitro System上的EC2 Instance，其中EBS的Volume會以NVMe block device的方式掛載在Instance中。[[1]](#Amazon-EBS-and-NVMe-on-Linux-instances)
在EBS指定的磁區名稱會被重新mapping為 `/dev/nvme[0-26]n1`
以上段圖例，
我的EBS Volume其實設定為：
![](/images/AWS/EBS-Volume.png)

其中
```
/dev/xvda -> nvme0n1
/dev/xvdz -> nvme1n1
```

在EC2 Instance內，你可以使用指令來檢查對應nvme裝置的mapping。
舉例查看 `/dev/nvme0n1`的名稱：
```bash
$ sudo /sbin/ebsnvme-id /dev/nvme0n1
Volume ID: vol-xxxxxxxx
xvda
```

## mkswap
以指定裝置設定Swap磁區並開啟Swap。
```bash
$ sudo mkswap /dev/nvme1n1
mkswap: /dev/nvme1n1: warning: wiping old swap signature.
Setting up swapspace version 1, size = 10 GiB (10737414144 bytes)
no label, UUID=62c94db1-3dfe-420d-a693-9a14d73ffdef
```

```bash
$ sudo swapon /dev/nvme1n1
```

執行後，再次檢查會得到
```bash
$ swapon -s
Filename                                Type            Size    Used    Priority
/dev/nvme1n1                            partition       10485756        0       -2
```

以 `top` 指令可以查看使用情形：
```bash
$ top
top - 00:48:24 up 1 day, 16:55,  0 users,  load average: 0.00, 0.07, 0.12
Tasks: 126 total,   1 running,  84 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.0 us,  2.0 sy,  0.0 ni, 89.6 id,  0.0 wa,  0.0 hi,  0.0 si,  3.5 st
KiB Mem :  3976984 total,   368968 free,  1579896 used,  2028120 buff/cache
KiB Swap: 10485756 total, 10485756 free,        0 used.  2168728 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 2924 root      20   0 1595148  47820  29364 S   0.7  1.2  21:18.03 containerd
 3373 root      20   0 2054812 111076  53008 S   0.7  2.8  21:00.35 dockerd
 4713 root      20   0  713120   9896   6480 S   0.7  0.2   7:02.12 containerd-shim
 4193 root      20   0  712864   9096   6092 S   0.3  0.2   0:28.93 containerd-shim
 ...
```

## fstab
寫入開機自動掛載。
```
$ echo "/dev/nvme1n1 none swap sw 0 0" | tee -a /etc/fstab
```

# With Launch Template
- TBD

# Reference
- [Instance store swap volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-swap-volumes.html)
- [Amazon EBS and NVMe on Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/nvme-ebs-volumes.html)
