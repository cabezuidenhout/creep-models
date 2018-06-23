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
function masterCurve = FitMasterCurve( trainData )
  masterCurve.coefficients = FitRegression( nOrderX( log10(trainData.stress),4) , trainData.p );
  
  masterCurve.stressRange.min = min( trainData.stress );
  masterCurve.stressRange.max = max( trainData.stress );

  masterCurve.temperatureRange.min = min( trainData.T );
  masterCurve.temperatureRange.max = max( trainData.T );

  masterCurve.trainData.stress = trainData.stress;
  masterCurve.trainData.p = trainData.p;

  masterCurve.testData.stress = linspace(masterCurve.stressRange.min,masterCurve.stressRange.max,100)';
  masterCurve.testData.p = PredictRegression(masterCurve.coefficients, nOrderX( log10(masterCurve.testData.stress), 4) );
  
  masterCurve.testDataExtended.stress =  linspace(10, masterCurve.stressRange.max*1.3 ,200)';
  masterCurve.testDataExtended.p = PredictRegression( masterCurve.coefficients, nOrderX( log10(masterCurve.testDataExtended.stress), 4) );
endfunction