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
function fit = FitIsoStress( isoData, kelvin = false, invertTemp = false )
  fit = struct;
  
  if( kelvin )
    T = ToK( isoData.TData );
  else
    T = isoData.TData;
  end

  if( invertTemp )
    T = 1./T;
  end

  X = nOrderX( T , 1);
  y = log10( isoData.trData );

  isoLine = FitRegression( X, y );

  fit.m = isoLine(2);
  fit.c = isoLine(1);
  fit.T = [ min(T) ; max(T) ];
  fit.logtr = PredictRegression( isoLine , nOrderX( fit.T, 1) ); 
  fit.tr = 10.^fit.logtr; 
end