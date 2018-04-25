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
function mhModel = ModelMansonHaferd( creepData, isoStressData )  
  T = ConvTemp( creepData.T, 'c', 'k');  

  c = isoStressData.fitK.c';
  m = isoStressData.fitK.m';

  A = [ -m , ones( size(m) ) ];

  params = FitRegression(A,c);

  logta = params(2);
  Ta = params(1);

  trainData = GetCreepMatrix( creepData );

  trainData.T = ConvTemp( trainData.T, 'c', 'k');

  pMhTrain = (log10( trainData.tr ) - logta) ./ ( trainData.T - Ta);

  masterCurveCoeff = FitRegression( nOrderX( log10( trainData.stress), 4), pMhTrain );

  trainData.p = pMhTrain;



  mhModel.model = 'Manson-Haferd';
  mhModel.material = creepData.material;
  mhModel.logta = logta;
  mhModel.Ta = Ta;

  mhModel.stressRange.min = min(trainData.stress);
  mhModel.stressRange.max = max(trainData.stress);  

  mhModel.temperatureRange.min = ConvTemp(min(trainData.T),'k','c');
  mhModel.temperatureRange.max = ConvTemp(max(trainData.T),'k','c');

  mhModel.masterCurve.coefficients = masterCurveCoeff;
  mhModel.masterCurve.trainData.stress = trainData.stress;
  mhModel.masterCurve.trainData.p = pMhTrain;

  mhModel.masterCurve.testData.stress = linspace(mhModel.stressRange.min,mhModel.stressRange.max,100);
  mhModel.masterCurve.testData.p = PredictRegression( masterCurveCoeff, nOrderX( log10(mhModel.masterCurve.testData.stress), 4) );

  mhModel.isoStressData = isoStressData;
endfunction