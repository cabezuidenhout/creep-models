nSelections = 8;
modernModelsStart = 6;
validModelSelected = false;
modelSelected = 0;

while( !validModelSelected )
  printf("Select a Creep Model :\n");
  printf("1 - Manson-Haferd\n");
  printf("2 - Goldhoff-Sherby")
  printf("3 - Larson-Miller\n");
  printf("4 - Orr-Sherby-Dorn\n");
  printf("5 - Manson-Succop\n");
  printf("6 - Minimum Commitment\n");
  printf("7 - Soviet A\n");
  printf("8 - Soviet B\n");
  modelSelected = input('Enter model number (1-8) : ');

  if( (modelSelected > nSelections) || (modelSelected <= 0) )
    printf("! Invalid selection\n");
  else
    switch (modelSelected)
      case 1
        modelName = "Manson-Haferd";
      case 2
        modelName = "Goldhoff-Sherby";
      case 3
        modelName = "Larson-Miller";
      case 4
        modelName = "Orr-Sherby-Dorn";
      case 5
        modelName = "Manson-Succop";
      case 6
        modelName = "Minimum Commitment";
      case 7
        modelName = "Soviet A";
      case 8
        modelName = "Soviet B";
    end

    validModelSelected = true;
  end
end