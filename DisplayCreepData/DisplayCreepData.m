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
function DisplayCreepData( creepData ) 
  creepData.T = creepData.T';

  jsonFilePath = GetAbsolutePath('DisplayCreepData.m');
  jsonFilePath = strcat( jsonFilePath, '/displayCreepDataTemplate/data.js');

  SaveJSON( creepData, jsonFilePath);
  open( strcat(GetAbsolutePath('DisplayCreepData.m'), '/displayCreepDataTemplate/index.html'));
end
