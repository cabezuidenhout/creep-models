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
function testResult = TrTestOrrSherbyDorn( osdModel, creepData )
  creepMatrix = GetCreepMatrix( creepData );

  testResult.T = creepMatrix.T;
  testResult.stress = creepMatrix.stress;
  testResult.trActual = creepMatrix.tr;
  testResult.trPredicted = PredictOrrSherbyDorn( osdModel, ConvTemp(testResult.T,'c','k'), testResult.stress );
  testResult.errors = Errors(testResult.trPredicted, testResult.trActual );
endfunction