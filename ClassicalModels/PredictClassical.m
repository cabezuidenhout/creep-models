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
function tr = PredictClassical( model, T, stress )
  
  tr = 0;

  p = PredictRegression( model.masterCurve.coefficients, nOrderX( log10(stress), 4 ));

  if( strcmp( model.name, "Manson-Haferd") )
    tr = ( T - model.constants.Ta).*p + model.constants.logta;
  elseif( strcmp( model.name, "Goldhoff-Sherby") )
    tr = ( 1./T - model.constants.TaInverse).*p + model.constants.logta;
  elseif( strcmp( model.name, "Larson-Miller") )
    tr = p./T - model.constants.Clm;
  elseif( strcmp( model.name, 'Orr-Sherby-Dorn') )
    tr = p + model.constants.Cosd./T;
  elseif( strcmp( model.name, 'Manson-Succop') )
    tr = p - model.constants.Cms.*T;
  else
    printf('! Unknown model : PredictClassical\n');
  end
  
  tr = 10.^tr; 
endfunction