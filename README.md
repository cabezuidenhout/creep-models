# Creep Models
### Table of Contents
- [1. Introduction](#1-introduction)
  - [1.1 Models Implemented](#11-models-implemented)
- [2. Requirements](#2-requirements)
- [3. Installation](#3-installation)
- [4. Using Creep Models](#4-using-creep-models)
- [5. Data file format](#5-data-file-format)

# 1. Introduction
Creep is the tendency of a material to deform permanently under the influence of mechanical stressess. Creep is observed in most engineering materials, especially materials at elevated temperatures.

Unlike a brittle fracture, creep deformation does not occur suddenly upon the application of stress. Instead, strain accumulates as a result of long-term stress. To avoid catastrophic failures and increase efficiency, an understanding of creep is essenstial for the success of designs by ensuring components do not experience excessive deformation and ultimately fail.

To quantify creep and creep fracture in high temperature applications, a variety of parametric methods have been developed. This application implements a number of well-known traditionally employed creep lifing methods with some more recent approaches also included.

## 1.1 Models Implemented
**Traditional :**
- [Goldhoff-Sherby](https://github.com/cabezuidenhout/creep-models/wiki/Goldhoff-Sherby)
- [Larson-Miller](https://github.com/cabezuidenhout/creep-models/wiki/Larson-Miller)
- [Manson-Haferd](https://github.com/cabezuidenhout/creep-models/wiki/Manson-Haferd)
- [Manson-Succop](https://github.com/cabezuidenhout/creep-models/wiki/Manson-Succop)
- [Orr-Sherby-Dorn](https://github.com/cabezuidenhout/creep-models/wiki/Orr-Sherby-Dorn)

**Modern :**
- [Soviet](https://github.com/cabezuidenhout/creep-models/wiki/Soviet)
- [Minimum Commitment](https://github.com/cabezuidenhout/creep-models/wiki/Minimum-Commitment)

# 2. Requirements
* A web browser
* Octave
  
# 3. Installation

1. Download repository
2. Unzip contents to a desired location
3. Navigate to the location where the repository was unzipped in octave
4. Run CreepModels.m from Octave

# 4. Using Creep Models

When running CreepModels.m the following output will be seen in the console :

```text
Creep Models v1.0
Copyright (C) 2018 CA Bezuidenhout
This program comes with ABSOLUTELY NO WARRANTY; for details type `warranty'
This is free software, and you are welcome to redistribute it under certain conditions; see the source code for copying conditions.
Press <CTRL+C> to exit
-----------------
Type 'model' to begin :
```

Follow the onscreen prompts

# 5. Data file format
The data files are located in the #Data folder as comma-seperated value (.csv files). The data should have the following structure:


| Matrial Name  | tr_1      | tr_2      | ...   | tr_n      |
|:-------------:|:---------:|:---------:|:-----:|:---------:|
| temp_1        |stress_11  |stress_12  | ...   | stress_1n |
| temp_2        |stress_21  |stress_22  | ...   | stress_2n |
| ...           |...        |...        | ...   | ...       |
| temp_m        |stress_m1  |stress_m2  | ...   | stress_mn |

Where tr is the time to rupture in hours, temp the temperature in degrees centigrade and stress the stress in MPa at rupture for a given time and temperature.
Example data files are provided for reference
