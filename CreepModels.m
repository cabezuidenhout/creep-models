% Copyright © 2018 CA Bezuidenhout
% This file is part of Creep Models.
%
% Creep Models is free software: you can redistribute it and/or modify
% it under the terms of the GNU General Public License as published by
% the Free Software Foundation, either version 3 of the License, or
% (at your option) any later version.
%
% Creep Models is distributed in the hope that it will be useful,
% but WITHOUT ANY WARRANTY; without even the implied warranty of
% MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
% GNU General Public License for more details.
%
% You should have received a copy of the GNU General Public License
% along with Creep Models.  If not, see <http://www.gnu.org/licenses/>.
%=====================================================================
clear all;
close all;
clc;

cmVersion = 1.0;

printf("Creep Models v%.1f\nCopyright (C) 2018 CA Bezuidenhout\n", cmVersion);
printf("This program comes with ABSOLUTELY NO WARRANTY; for details type `warranty'\n");
printf("This is free software, and you are welcome to redistribute it under certain conditions; see the source code for copying conditions.\n");
printf("Press <CTRL+C> to exit\n");
printf('-----------------\n');

AddPaths;

started = false;

while( !started )
  userInput = input("Type 'model' to begin : ", 's');

  if( strcmp(tolower(userInput), 'warranty' ) )
    printf('--------------------------------------------------------------------\n');
    printf("Creep Models v%.1f\n", cmVersion);
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
    clc;
  else
    printf("Invalid option press <Ctrl+C> to exit\n")
  end
end

done = false;

while( !done)
  SelectDataFile;

  clc;

  SelectModel;  

  clc;

  if( modelSelected < modernModelsStart )
    CreateClassicalModel;
  else
    CreateModernModel
  end

  done = !YoN("Do you want to create another model?");
  clc;
end

printf("Thank you for using Creep Models\n");

