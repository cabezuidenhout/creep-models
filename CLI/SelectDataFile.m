correctDataFile = false;

while( !correctDataFile )
  dataFile = input("Enter data file name (eg. '12CrMoV7'): ", "s");
  [creepData, validData] = LoadCreepData(dataFile);

  if( validData )
    DisplayCreepData(creepData);
    printf("- Displaying creep data in web browser\n");
    correctDataFile = YoN("Is this the correct data file?");

    if( !correctDataFile)
      validData = false;
    end

  else
    printf('!!! Invalid data file\n');
  end
end