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
function mhModel = ModelMansonHaferd( creepData, isoStressData, fitAll = false )   
  c = [struct2cell(isoStressData.fitK.c){:}]';
  m = [struct2cell(isoStressData.fitK.m){:}]';

  A = [ -m , ones( size(m) ) ];

  params = FitRegression(A,c);

  logta = params(2);
  Ta = params(1);

  if( fitAll ) 
    trainData = GetCreepMatrix( creepData );
    pMhTrain = (log10( trainData.tr ) - logta) ./ ( ConvTemp(trainData.T,'c','k') - Ta);
  else
    pMhTrain = m;
    trainData.T = [struct2cell(isoStressData.TData){:}];
    trainData.stress = isoStressData.stress';
  end

  masterCurveCoeff = FitRegression( nOrderX( log10( trainData.stress), 4), pMhTrain );

  trainData.p = pMhTrain;

  mhModel.model = 'Manson-Haferd';
  mhModel.material = creepData.material;
  mhModel.logta = logta;
  mhModel.Ta = Ta;

  mhModel.stressRange.min = min(trainData.stress);
  mhModel.stressRange.max = max(trainData.stress);  

  mhModel.temperatureRange.min = min(trainData.T);
  mhModel.temperatureRange.max = max(trainData.T);

  mhModel.masterCurve.coefficients = masterCurveCoeff;
  mhModel.masterCurve.trainData.stress = trainData.stress;
  mhModel.masterCurve.trainData.p = pMhTrain;

  mhModel.masterCurve.testData.stress = linspace(mhModel.stressRange.min,mhModel.stressRange.max,100);
  mhModel.masterCurve.testData.p = PredictRegression( masterCurveCoeff, nOrderX( log10(mhModel.masterCurve.testData.stress), 4) );
  
  mhModel.isoStress = isoStressData;
end
