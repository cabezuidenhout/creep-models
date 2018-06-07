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
function lmModel = ModelLarsonMiller( creepData, isoStressData )
  Clm = mean( -1*isoStressData.fitInverseK.c );

  trainData = GetCreepMatrix(creepData);

  trainData.T = ConvTemp( trainData.T, 'c', 'k' );
  pLmTrain = trainData.T.*[ Clm + log10(trainData.tr) ];

  masterCurveCoeff = FitRegression( nOrderX( log10( trainData.stress), 4), pLmTrain );

  trainData.p = pLmTrain;

  lmModel.model = 'Larson-Miller';
  lmModel.material = creepData.material;
  lmModel.Clm = Clm;

  lmModel.stressRange.min = min(trainData.stress);
  lmModel.stressRange.max = max(trainData.stress);  

  lmModel.temperatureRange.min = ConvTemp(min(trainData.T),'k','c');
  lmModel.temperatureRange.max = ConvTemp(max(trainData.T),'k','c');

  lmModel.masterCurve.coefficients = masterCurveCoeff;
  lmModel.masterCurve.trainData.stress = trainData.stress;
  lmModel.masterCurve.trainData.p = pLmTrain;

  lmModel.masterCurve.testData.stress = linspace(lmModel.stressRange.min,lmModel.stressRange.max,100);
  lmModel.masterCurve.testData.p = PredictRegression( masterCurveCoeff, nOrderX( log10(lmModel.masterCurve.testData.stress), 4) );

  lmModel.isoStressData = isoStressData;
endfunction