% Copyright © 2018 CA Bezuidenhout
% This file is part of creep-models.
%
% creep-models is free software: you can redistribute it and/or modify
% it under the terms of the GNU General Public License as published by
% the Free Software Foundation, either version 3 of the License, or
% (at your option) any later version.
%
% creep-models is distributed in the hope that it will be useful,
% but WITHOUT ANY WARRANTY; without even the implied warranty of
% MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
% GNU General Public License for more details.
%
% You should have received a copy of the GNU General Public License
% along with creep-models.  If not, see <http://www.gnu.org/licenses/>.
%=====================================================================

clear all;
close all;
clc;

printf("Creep Models\nCopyright (C) 2018 CA Bezuidenhout\n");
printf("This program comes with ABSOLUTELY NO WARRANTY; for details type `warranty'\n");
printf("This is free software, and you are welcome to redistribute it under certain conditions; see the source code for copying conditions.\n");
printf("Press <CTRL+C> to exit\n");
printf('-----------------\n');

AddPaths;

started = false;

while( !started )
  userInput = input("Type 'model' to begin : ",'s');

  if( strcmp(tolower(userInput), 'warranty' ) )
    printf('--------------------------------------------------------------------\n');
    printf("Creep Models\n");
    printf("Copyright (C) 2018 CA Bezuidenhout.\n\n");

    printf("Creep Models is free software; you can redistribute it and/or modify\n");
    printf("it under the terms of the GNU General Public License as published by\n");
    printf("the Free Software Foundation; either version 3 of the License, or\n");
    printf("(at your option) any later version.\n\n");

    printf("Creep Models is distributed in the hope that it will be useful,\n");
    printf("but WITHOUT ANY WARRANTY; without even the implied warranty of\n");
    printf("MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n");
    printf("GNU General Public License for more details.\n\n");

    printf("You should have received a copy of the GNU General Public License\n");
    printf("along with this program.  If not, see <http://www.gnu.org/licenses/>.\n");
    printf('--------------------------------------------------------------------\n');
  elseif( strcmp(tolower(userInput), 'model') ) 
    started = true;
  else
    printf("Invalid option press <Ctrl+C> to exit\n")
  end
end

done = false;

while( !done )

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

  nSelections = 3;
  validModelSelected = false;
  modelSelected = 0;

  while( !validModelSelected )
    printf("Select a Creep Model :\n");
    printf("1 - Manson-Haferd\n");
    printf("2 - Larson-Miller\n");
    printf("3 - Orr-Sherby-Dorn\n");
    modelSelected = input('Enter model number (1-3) : ');

    if( (modelSelected > nSelections) || (modelSelected <= 0) )
      printf("! Invalid selection\n");
    else
      validModelSelected = true;
    end
  end

  correctTolerance = false;
  tolerance = 0;

  while( !correctTolerance )
    tolerance = input("Enter iso-stress tolerance (MPa) : ");

    if( isempty(tolerance) ) 
      printf("! No selection made\n");
    else
      tolerance = abs(tolerance);
      isoStress = GetIsoStress(creepData, tolerance);
      DisplayIsoStress(isoStress);
      printf("- Displaying iso-stress data in web browser\n");
      correctTolerance = YoN("Do you want to use these iso-stress lines?");
    endif
  end

  if( modelSelected == 1) %Manson-Haferd
    mhModel = ModelMansonHaferd( creepData, isoStress );
    DisplayMansonHaferd(mhModel, creepData);
    printf("- Displaying Manson-Haferd model in web browser\n");
  elseif( modelSelected == 2) %Larson-Miller
    lmModel = ModelLarsonMiller( creepData, isoStress );
    DisplayLarsonMiller(lmModel, creepData);
    printf("- Displaying Larson-Miller model in web browser\n");
  elseif( modelSelected == 3 ) %Orr-Sherby-Dorn
    osdModel = ModelOrrSherbyDorn( creepData, isoStress );
    DisplayOrrSherbyDorn( osdModel, creepData );
    printf("- Displaying Orr-Sherby-Dorn model in web browser\n");
  endif

  done = !YoN("Do you want to create another model?");
end

printf("Thank you for using Creep Models\n");
exit();


