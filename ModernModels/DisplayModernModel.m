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
function DisplayModernModel( model, creepData )
  modelData = model;
  modelData.trTest = ModernTrTest( model, creepData );
  modelData.constT = ModernConstT( model , mean( creepData.T(:) ) );
  modelData.constStress = ModernConstStress( model, mean( creepData.stress(:) ) );

  jsonFilePath = GetAbsolutePath('DisplayModernModel.m');
  jsonFilePath = strcat( jsonFilePath, '/template/data.js');

  SaveJSON( modelData, jsonFilePath);
  open( strcat(GetAbsolutePath('DisplayModernModel.m'), '/template/index.html'));
end