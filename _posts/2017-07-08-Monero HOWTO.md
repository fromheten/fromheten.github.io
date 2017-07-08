---
layout: post
title: Monero HOWTO
date: 2017-07-08 13:09
comments: true
categories:
---
This document describes how to set up and get started with Monero. I'm running [NixOS](https://nixos.org/) ([NixOS setup HOWTO](/linux/nixos/intel/nuc/server/2017/04/15/Building_a_NixOS_server_from_a_Intel_NUC.html)) - but it's equally applicable for other Linux systems, BSD, MacOS et cetera.

## 0.0: Install

* NixOS
`$ nix-shell -p monero` and you are inside a shell where you have the monero software.

* MacOS Homebrew
`$ brew tap sammy007/cryptonight && brew install monero --build-from-source`

* [Others...](https://github.com/monero-project/monero#installing-monero-from-a-package)

## 0.1: Firewall
Open [these TCP ports](https://monero.stackexchange.com/questions/604/what-ports-does-monero-use-rpc-p2p-etc):
* P2P: 18080 for the mainnet, 28080 for the testnet
* RPC: 18081 for the mainnet, 28081 for the testnet

## 0.1.1: NixOS Firewall

I do not open the RPC ports to the world.

In `/etc/nixos/configuration.nix` add `networking.firewall.allowedTCPPorts = [ 18080 28080 ];`. I also have other ports open, but you have to find them the hard way ;-).

Then run `$ nixos-rebuild switch` and the system will be rebuilt according to the new `configuration.nix` file. Declarative Linux is nice!

## 1: Start Daemon
Start the daemon - here I initialise it with a few seed nodes.

`$ monerod --add-peer 107.152.130.98:18080 --add-peer 212.83.175.67:18080 --add-peer 5.9.100.248:18080 `

The blockchain data is now being downloaded to `~/.bitmonero`. Currently around 20GB, but growing forever.

## 2: Set up wallet
In a different shell (or with the daemon in the background, or whatever) run `$ monero-wallet-cli`. Do not send any money to the address below, as the text contains it's seed from which you can get the private key and spend.

```
~ $ monero-wallet-cli
Monero 'Wolfram Warptangent' (v0.10.1.0-release)
Logging at log level 0 to /nix/store/xsfnxgb4qx5davs0sb3a9hf58llz0fch-monero-0.10.1/bin/monero-wallet-cli.log
Specify wallet file name (e.g., MyWallet). If the wallet doesn't exist, it will be created.
Wallet file name (or Ctrl-C to quit): FirstWallet
No wallet found with that name. Confirm creation of new wallet named: FirstWallet
(Y/Yes/N/No): Y
Generating new wallet...
Enter a password for your new wallet: ************************************************************
Confirm Password: ************************************************************
List of available languages for your wallet's seed:
0 : English
1 : Spanish
2 : German
3 : Italian
4 : Portuguese
5 : Russian
6 : Japanese
Enter the number corresponding to the language of your choice: 0
Generated new wallet: 44K2CTDJvdoYX4gq2kgYWmEA9Nz6A6BczK8Uk7JareybF3hK2tKDzJRKViZiq2nFGj459YVQ1Ehk6dkKrF2QqQmtMq795Va
View key: 1cad91d60478d72d4cef8e75cf30955851cda2fc4840f6395238a80bd8ed6a09
**********************************************************************
Your wallet has been generated!
To start synchronizing with the daemon, use "refresh" command.
Use "help" command to see the list of available commands.
Always use "exit" command when closing monero-wallet-cli to save your
current session's state. Otherwise, you might need to synchronize
your wallet again (your wallet keys are NOT at risk in any case).


PLEASE NOTE: the following 25 words can be used to recover access to your wallet. Please write them down and store them somewhere safe and secure. Please do not store them in your email or on file storage services outside of your immediate control.

invoke lectures aunt aztec rumble request javelin magically
vastness july bamboo sake clue soprano jigsaw akin
giant tawny duration sizes left ounce being bypass invoke
**********************************************************************
Starting refresh...
Refresh done, blocks received: 57
Balance: 0.000000000000, unlocked balance: 0.000000000000
Background refresh thread started
[wallet 44K2CT]:

```

## 3: Send and receive monero
Now when your wallet is created, and you are in the prompt of `monero-wallet-cli`, you can send money with `transfer <address> 0.5`. Others can do the same, and send money to you.

Done!
