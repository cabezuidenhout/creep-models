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
function DisplayOrrSherbyDorn( osdModel, creepData ) 
  osdInfo = osdModel;

  osdInfo.masterCurve.coefficients = osdInfo.masterCurve.coefficients';
  osdInfo.masterCurve.testData.p = osdInfo.masterCurve.testData.p';
  osdInfo.masterCurve.trainData.p = osdInfo.masterCurve.trainData.p';
  osdInfo.masterCurve.trainData.stress = osdInfo.masterCurve.trainData.stress';

  osdInfo.isoStressData.stress = osdInfo.isoStressData.stress';

  osdInfo.stressTest = StressTestOrrSherbyDorn( osdModel, creepData );
  osdInfo.stressTest.T = osdInfo.stressTest.T';

  osdInfo.trTest = TrTestOrrSherbyDorn( osdModel, creepData);
  osdInfo.trTest.T = osdInfo.trTest.T';
  osdInfo.trTest.stress = osdInfo.trTest.stress';
  osdInfo.trTest.trActual = osdInfo.trTest.trActual';
  osdInfo.trTest.trPredicted = osdInfo.trTest.trPredicted';
  osdInfo.trTest.errors.Err = osdInfo.trTest.errors.Err';
  osdInfo.trTest.errors.Err = osdInfo.trTest.errors.Err';
  osdInfo.trTest.errors.Percentage = osdInfo.trTest.errors.Percentage';

  osdInfo.constT = ConstTOrrSherbyDorn( osdModel, mean( creepData.T(:) ));
  osdInfo.constStress = ConstStressOrrSherbyDorn( osdModel, mean( creepData.stress(:) ) );

  jsonFilePath = GetAbsolutePath('DisplayOrrSherbyDorn.m');
  jsonFilePath = strcat(jsonFilePath,'/displayOrrSherbyDornTemplate/data.js');

  SaveJSON( osdInfo, jsonFilePath);
  open( strcat(GetAbsolutePath('DisplayOrrSherbyDorn.m'), '/displayOrrSherbyDornTemplate/index.html'));
endfunction