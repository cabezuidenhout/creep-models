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
function DisplayIsoStress( isoStressData )   
  isoStressData.stress = isoStressData.stress';

  jsonFilePath = GetAbsolutePath('DisplayIsoStress.m');
  jsonFilePath = strcat( jsonFilePath, '/displayIsoStressTemplate/data.js');
  
  SaveJSON( isoStressData, jsonFilePath);
  open( strcat(GetAbsolutePath('DisplayIsoStress.m'), '/displayIsoStressTemplate/index.html'));
end
