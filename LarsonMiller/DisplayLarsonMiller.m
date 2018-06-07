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
function DisplayLarsonMiller( lmModel, creepData ) 
  lmInfo = lmModel;

  lmInfo.masterCurve.coefficients = lmInfo.masterCurve.coefficients';
  lmInfo.masterCurve.testData.p = lmInfo.masterCurve.testData.p';
  lmInfo.masterCurve.trainData.p = lmInfo.masterCurve.trainData.p';
  lmInfo.masterCurve.trainData.stress = lmInfo.masterCurve.trainData.stress';

  lmInfo.isoStressData.stress = lmInfo.isoStressData.stress';

  lmInfo.stressTest = StressTestLarsonMiller( lmModel, creepData );
  lmInfo.stressTest.T = lmInfo.stressTest.T';

  lmInfo.trTest = TrTestLarsonMiller( lmModel, creepData);
  lmInfo.trTest.T = lmInfo.trTest.T';
  lmInfo.trTest.stress = lmInfo.trTest.stress';
  lmInfo.trTest.trActual = lmInfo.trTest.trActual';
  lmInfo.trTest.trPredicted = lmInfo.trTest.trPredicted';
  lmInfo.trTest.errors.Err = lmInfo.trTest.errors.Err';
  lmInfo.trTest.errors.Err = lmInfo.trTest.errors.Err';
  lmInfo.trTest.errors.Percentage = lmInfo.trTest.errors.Percentage';

  lmInfo.constT = ConstTLarsonMiller( lmModel, mean( creepData.T(:) ));
  lmInfo.constStress = ConstStressLarsonMiller( lmModel, mean( creepData.stress(:) ) );

  jsonFilePath = GetAbsolutePath('DisplayLarsonMiller.m');
  jsonFilePath = strcat(jsonFilePath,'/displayLarsonMillerTemplate/data.js');

  SaveJSON( lmInfo, jsonFilePath);
  open( strcat(GetAbsolutePath('DisplayLarsonMiller.m'), '/displayLarsonMillerTemplate/index.html'));
endfunction