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
function [ creepData, loaded ] = LoadCreepData( filename )
  filepath = GetAbsolutePath('DataDummy.m');
  creepData = NaN;
  loaded = false;

  filepath = strcat( filepath, '/', filename, '.csv' );

  if( exist( filepath ) == 2 )
    dataFile = fopen( filepath );
    
    if( is_valid_file_id( dataFile ) ) 
      creepData = struct();

      firstLine = fgetl(dataFile);
      fclose(dataFile);
      firstLine = strsplit( firstLine, ',');
      creepData.material = firstLine{1};

      rawData = csvread( filepath );

      creepData.tr = rawData(1,:);
      creepData.tr(1) = [];
      rawData(1,:) = [];

      creepData.T = rawData(:,1);
      rawData(:,1) = [];

      creepData.stress = rawData;
      loaded = true;
    else
      printf('Could not open %s. Please close any other open instance of the file\n')
    endif
  else
    printf('%s not found. Please ensure the file exists.\n', filepath);    
  endif
endfunction