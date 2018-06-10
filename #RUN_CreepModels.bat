@echo off
title Creep Models Launcher
set currentpath=%cd%
set octavepath=%cd%\octave\bin\octave-cli-4.2.1.exe
set scriptpath=%currentpath%\CreepModels.m
start "Creep Models" %octavepath% %scriptpath%