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
function osdModel = ModelOrrSherbyDorn( creepData, isoStressData, fitAll = false )
  Cosd = -1*mean( isoStressData.mKInverse );

  osdModel.model = "Orr-Sherby-Dorn";
  osdModel.material = creepData.material;
  osdModel.Cosd = Cosd;

  creepMatrix = GetCreepMatrix( creepData );
  allP = (log10(creepMatrix.tr)- Cosd./ToK( creepMatrix.T));

  if( fitAll)
    trainData = creepMatrix;
    trainData.p = allP;
  else
    trainData.p = isoStressData.cKInverse;
    trainData.stress = isoStressData.stress;
    trainData.T = GetIsoStressT( isoStressData );
  end

  osdModel.masterCurve = FitMasterCurve(trainData, max(creepMatrix.stress*1.1));

  if( !fitAll )
    osdModel.masterCurve.allParameters = allP;
    osdModel.masterCurve.allStress = creepMatrix.stress;
  end

  osdModel.isoStress = isoStressData;
endfunction