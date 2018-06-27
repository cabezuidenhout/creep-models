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
function model = ClassicalModel( modelName, creepData, isoStressData, fitAll = false)
  model.material = creepData.material;
  model.name = modelName;
  creepMatrix = GetCreepMatrix( creepData );
  model.constants = GetClassicalConstants( modelName, isoStressData );

  allP = GetParameter( model, ToK(creepMatrix.T), creepMatrix.tr );

  if( fitAll )
    trainData = creepMatrix;
    trainData.p = allP;
  else
    trainData.p = GetParameterFromIsoStress( modelName, isoStressData );
    trainData.stress = isoStressData.stress;
    trainData.T = GetIsoStressT( isoStressData );
  end

  model.masterCurve = FitMasterCurve( trainData, max(creepMatrix.stress*1.1) );

  if( !fitAll )
    model.masterCurve.allParameters = allP;
    model.masterCurve.allStress = creepMatrix.stress;
  end

  model.isoStress = isoStressData;
end