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
function creepMatrix = GetCreepMatrix( creepData )
  
  creepMatrix = -1;
  
  if( ( size( creepData.tr, 2) == size( creepData.stress, 2) ) && ( size( creepData.stress, 1) == size( creepData.T, 1) ) )
    creepMatrix = struct();
    creepMatrix.T = creepData.T;
    creepMatrix.stress = creepData.stress(:,1);
    creepMatrix.tr = ones( size(creepData.T) )*creepData.tr(1);

    for i=2:size(creepData.stress, 2)
      creepMatrix.T = [ creepMatrix.T ; creepData.T ];
      creepMatrix.stress = [ creepMatrix.stress ; creepData.stress(:,i) ];
      creepMatrix.tr = [ creepMatrix.tr ; ones( size(creepData.T) )*creepData.tr(i) ];
    end
  else
    printf('Invalid creep data. Dimension mismatch\n');
  end
endfunction