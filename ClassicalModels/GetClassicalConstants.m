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
function constants = GetClassicalConstants( modelName, isoStressData )  
  if( strcmp(modelName,'Manson-Haferd') )
    constants.TInverted = false;
    c = isoStressData.cK;
    m = isoStressData.mK;

    A = [ -m, ones( size(m) ) ];

    params = FitRegression(A,c);

    constants.logta = params(2);
    constants.Ta = params(1);     
  elseif( strcmp( modelName, 'Goldhoff-Sherby') )
    constants.TInverted = true;
    c = isoStressData.cKInverse;
    m = isoStressData.mKInverse;

    A = [ -m, ones( size(m) ) ];

    params = FitRegression(A,c);

    constants.logta = params(2);
    constants.TaInverse = params(1);
  elseif( strcmp( modelName, 'Larson-Miller') )
    constants.TInverted = true;
    constants.Clm = -1*mean( isoStressData.cKInverse);
  elseif( strcmp( modelName, 'Orr-Sherby-Dorn') )
    constants.TInverted = true;
    constants.Cosd = mean( isoStressData.mKInverse);
  elseif( strcmp( modelName, 'Manson-Succop') )
    constants.TInverted = false;
    constants.Cms = -1*mean( isoStressData.mK );
  else
    printf('! Unknown model : GetClassicalConstants\n');
  end
end