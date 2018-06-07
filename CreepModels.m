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

AddPaths;

printf('------------\n');
printf('Creep Models\n');
printf('------------\n\n');


correctDataFile = false;
validData = false;

while( !correctDataFile ) 
  dataFile = input('Enter data file name : ', 's');

  [creepData, validData ] = LoadCreepData(dataFile);

  if( validData ) 

    titles = cell();

    title{1} = 'Temperature';

    for i=1:length(creepData.tr)
      titles{1+i} = num2str(creepData.tr(i));
    end

    displayTable( [ creepData.T , creepData.stress], titles, strcat(creepData.material,' Data'));
    correctDataFile = YoN('Is this the correct data file?');

    if( !correctDataFile )
      validData = false;
    end
  end
end






