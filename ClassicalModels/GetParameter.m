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
function p = GetParameter( model , T, tr )
  if( strcmp( model.name, 'Manson-Haferd') )
    p = ( log10(tr) - model.constants.logta ) ./ ( T - model.constants.Ta );
  elseif( strcmp( model.name, 'Goldhoff-Sherby') ) 
    p = ( log10(tr) - model.constants.logta ) ./ ( (1./T) - model.constants.TaInverse );
  elseif( strcmp( model.name , 'Larson-Miller') )
    p = T.*( model.constants.Clm + log10(tr) );
  elseif( strcmp( model.name, 'Orr-Sherby-Dorn') )
    p = log10(tr) - model.constants.Cosd./T;
  elseif( strcmp( model.name, 'Manson-Succop') )
    p = log10(tr) + model.constants.Cms.*T;
  else
    printf('! Unknown model : GetParameter\n');
  end
end