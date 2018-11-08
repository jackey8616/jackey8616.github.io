---
title: Cisco IOS commands
date: 2018-11-07 17:41:42
tags:
  - Note
  - Cisco
categories: Note
---

各種Cisco設定。
<!-- More -->

#  Set username
```
(config)# username *name* {nopassword | password *password* | password *encryption-type* *encrypted-password*}
Ex:
(config)# username *name* password *password*   <-- Password will not encrypt.

(config)# username *name* [access-class *number*]
(config)# username *name* [privilege *level*]
```
[Reference](https://www.cisco.com/c/en/us/td/docs/ios/12_2/security/command/reference/fsecur_r/srfpass.html#username)

# SSH login
## Set username
Reference on [top](./#Set username).

## Set domain and encrypt key
(config)# ip domain-name *domain name*
(config)# crypto key generate rsa           <-- Make a RSA key.
How many bit in the modulus[512]: 1024      <-- Use 1024 bit to encrypt(default 512)

## Enable SSH
(config)# ip ssh version [1 | 2]
(config)# ip ssh {timeout *seconds* | authentication-retries *number*}
(config)# line vty *line_number* [*ending_line_number*]
(config-line)# login ssh
(config-line)# transport input ssh          <-- Enable ssh
