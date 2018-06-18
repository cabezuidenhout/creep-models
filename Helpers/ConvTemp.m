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
function convertedValues = ConvTemp( valuesToConvert , inputTemperatureUnit, outputTemperatureUnit )
  inputTemperatureUnit = tolower( inputTemperatureUnit );
  outputTemperatureUnit = tolower( outputTemperatureUnit );

  if( abs( inputTemperatureUnit - outputTemperatureUnit ) == 8 )
    if( inputTemperatureUnit == 'k' )
      convertedValues = valuesToConvert - 273.15;
    elseif( inputTemperatureUnit == 'c' )
      convertedValues = valuesToConvert + 273.15;
    end
  else
    printf('!!! Invalid input or output temperature unit\n');
  endif

endfunction