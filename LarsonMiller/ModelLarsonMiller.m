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
function lmModel = ModelLarsonMiller( creepData, isoStressData, fitAll = false )
  Clm = -1*mean( isoStressData.cKInverse );

  lmModel.model = "Manson-Haferd";
  lmModel.material = creepData.material;
  lmModel.Clm = Clm;

  creepMatrix = GetCreepMatrix( creepData );
  allP = ToK( creepMatrix.T).*(Clm + log10(creepMatrix.tr));

  if( fitAll)
    trainData = creepMatrix;
    trainData.p = allP;
  else
    trainData.p = isoStressData.mKInverse;
    trainData.stress = isoStressData.stress;
    trainData.T = GetIsoStressT( isoStressData );
  end

  lmModel.masterCurve = FitMasterCurve(trainData, max(creepMatrix.stress*1.1));

  if( !fitAll )
    lmModel.masterCurve.allParameters = allP;
    lmModel.masterCurve.allStress = creepMatrix.stress;
  end

  lmModel.isoStress = isoStressData;
endfunction