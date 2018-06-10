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
function constT = ConstTMansonSuccop( msModel, T, minStress = 10, maxStress = 250, n=200)
  constT.T = T;
  constT.stress = linspace( minStress, maxStress, n)';
  constT.tr = zeros( length(constT.stress), length(T));

  for i=1:length(T)
    constT.tr(:,i) = PredictMansonSuccop( msModel, ConvTemp(T(i),'c','k'), constT.stress);
  end

  constT.stress = constT.stress';
endfunction