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
function constT = ConstTMansonHaferd( mhModel, stress, minT = 400, maxT = 750, n=200)
  constT.stress = stress;
  constT.T = linspace( minT, maxT, n)';
  constT.tr = zeros( length(constT.T), length(constT.stress));

  for i=1:length(stress)
    constT.tr(:,i) = PredictMansonHaferd( mhModel, constT.T, stress(i));
  end

  constT.stress = constT.stress';
endfunction