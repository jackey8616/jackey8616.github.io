---
title: Fish with NVM, Be friendly ok?
date: 2018-04-10 14:01:51
tags:
  - Fish
  - Linux
  - NVM
  - NPM
categories: LifeGeeking
---
  
Recently I am trying to use nvm under fish.  
But it seems not so well.  
<!-- More -->  
# [edc/bass](https://github.com/edc/bass)  
By installing a plugin in fish,  
This plugin can execute command for users.  
  
But i haven't find any good solution to automatically run this plugin while starting fish.  
  
## Tricky part  
I can't find ways to do so.  
But i saw fish's function define is cool and fancy.  
  
So open my fish config folder, in functions folder,  
I create a fish command named nvm.fish,  
inside it, simply define a function which call bass plugin to load nvm.sh in $NVM_DIR  
  
I put my config on github right [here](https://github.com/jackey8616/config)  
and [this is the file](https://github.com/jackey8616/config/blob/master/.config/fish/functions/nvm.fish) what i added.  
  
detail usage of bass, you can see at [here](https://github.com/edc/bass/blob/master/README.md#nvm).  
  
# Bad news  
Truth is, i still can't automatically load npm itself.  
And i have totally no idea.  
  
Every time after fish inited. it still can not recornize nvm and npm command.  
BUT, nvm command will load as fish's customize command,  
that's way a new fish shell after generated can recornize nvm,  
  
and yet, before nvm been 'execute' on time,  
os can not recornize any package under nvm.  
  
So that's way a new fish shell can execute nvm but not npm command after inited.  
I guess i have to find more tricky magic to run a nvm after inited.  

