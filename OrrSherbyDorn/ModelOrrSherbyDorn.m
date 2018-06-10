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
function osdModel = ModelOrrSherbyDorn( creepData, isoStressData )
  Cosd = mean( isoStressData.fitInverseK.m );

  trainData = GetCreepMatrix(creepData);

  trainData.T = ConvTemp( trainData.T, 'c', 'k' );
  pOsdTrain = log10(trainData.tr) - (Cosd./trainData.T);

  masterCurveCoeff = FitRegression( nOrderX( log10( trainData.stress), 4), pOsdTrain );

  trainData.p = pOsdTrain;

  osdModel.model = 'Orr-Sherby-Dorn';
  osdModel.material = creepData.material;
  osdModel.Cosd = Cosd;

  osdModel.stressRange.min = min(trainData.stress);
  osdModel.stressRange.max = max(trainData.stress);  

  osdModel.temperatureRange.min = ConvTemp(min(trainData.T),'k','c');
  osdModel.temperatureRange.max = ConvTemp(max(trainData.T),'k','c');

  osdModel.masterCurve.coefficients = masterCurveCoeff;
  osdModel.masterCurve.trainData.stress = trainData.stress;
  osdModel.masterCurve.trainData.p = pOsdTrain;

  osdModel.masterCurve.testData.stress = linspace(osdModel.stressRange.min,osdModel.stressRange.max,100);
  osdModel.masterCurve.testData.p = PredictRegression( masterCurveCoeff, nOrderX( log10(osdModel.masterCurve.testData.stress), 4) );

  osdModel.isoStressData = isoStressData;
endfunction