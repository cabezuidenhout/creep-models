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
function X = GetModernX( modelName, T, stress)
  X = [];

  if( ( size(T,2) == 1 ) && ( size(stress,2) == 1 ) && ( size(stress,1) == size(T,1) ) )
    if( strcmp( modelName, 'Minimum Commitment') )
      X = [ ones(length(T),1), log10(stress), stress, stress.^2, T, 1./T ];
    elseif( strcmp( modelName, 'Soviet A') )
      X = [ ones(length(T),1), log10(T), log10(stress), 1./T, stress./T];
    elseif( strcmp( modelName, 'Soviet B') )
      X = [ ones(length(T),1), log10(T), log10(stress)./T, 1./T, stress./T];
    end    
  else
    printf('! Wrong dimensions : s and T must be column vectors with same length GetModernX\n');
  end
end