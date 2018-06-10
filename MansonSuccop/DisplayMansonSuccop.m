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
function DisplayMansonSuccop( msModel, creepData ) 
  msInfo = msModel;

  msInfo.masterCurve.coefficients = msInfo.masterCurve.coefficients';
  msInfo.masterCurve.testData.p = msInfo.masterCurve.testData.p';
  msInfo.masterCurve.trainData.p = msInfo.masterCurve.trainData.p';
  msInfo.masterCurve.trainData.stress = msInfo.masterCurve.trainData.stress';

  msInfo.isoStressData.stress = msInfo.isoStressData.stress';

  msInfo.stressTest = StressTestMansonSuccop( msModel, creepData );
  msInfo.stressTest.T = msInfo.stressTest.T';

  msInfo.trTest = TrTestMansonSuccop( msModel, creepData);
  msInfo.trTest.T = msInfo.trTest.T';
  msInfo.trTest.stress = msInfo.trTest.stress';
  msInfo.trTest.trActual = msInfo.trTest.trActual';
  msInfo.trTest.trPredicted = msInfo.trTest.trPredicted';
  msInfo.trTest.errors.Err = msInfo.trTest.errors.Err';
  msInfo.trTest.errors.Err = msInfo.trTest.errors.Err';
  msInfo.trTest.errors.Percentage = msInfo.trTest.errors.Percentage';

  msInfo.constT = ConstTMansonSuccop( msModel, mean( creepData.T(:) ));
  msInfo.constStress = ConstStressMansonSuccop( msModel, mean( creepData.stress(:) ) );

  jsonFilePath = GetAbsolutePath('DisplayMansonSuccop.m');
  jsonFilePath = strcat(jsonFilePath,'/displayMansonSuccopTemplate/data.js');

  SaveJSON( msInfo, jsonFilePath);
  open( strcat(GetAbsolutePath('DisplayMansonSuccop.m'), '/displayMansonSuccopTemplate/index.html'));
endfunction