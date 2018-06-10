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
function msModel = ModelMansonSuccop( creepData, isoStressData )
  Cms = mean( -1*isoStressData.fitK.m );

  trainData = GetCreepMatrix(creepData);

  trainData.T = ConvTemp( trainData.T, 'c', 'k' );
  pMsTrain = log10(trainData.tr) + Cms.*trainData.T;
  
  masterCurveCoeff = FitRegression( nOrderX( log10( trainData.stress), 4), pMsTrain );

  trainData.p = pMsTrain;

  msModel.model = 'Manson-Succop';
  msModel.material = creepData.material;
  msModel.Cms = Cms;

  msModel.stressRange.min = min(trainData.stress);
  msModel.stressRange.max = max(trainData.stress);  

  msModel.temperatureRange.min = ConvTemp(min(trainData.T),'k','c');
  msModel.temperatureRange.max = ConvTemp(max(trainData.T),'k','c');

  msModel.masterCurve.coefficients = masterCurveCoeff;
  msModel.masterCurve.trainData.stress = trainData.stress;
  msModel.masterCurve.trainData.p = pMsTrain;

  msModel.masterCurve.testData.stress = linspace(msModel.stressRange.min,msModel.stressRange.max,100);
  msModel.masterCurve.testData.p = PredictRegression( masterCurveCoeff, nOrderX( log10(msModel.masterCurve.testData.stress), 4) );

  msModel.isoStressData = isoStressData;
endfunction