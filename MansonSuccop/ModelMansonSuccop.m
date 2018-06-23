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
function msModel = ModelMansonSuccop( creepData, isoStressData, fitAll = false )
  
  Cms = -1*mean(isoStressData.mK);
  
  msModel.model = "Manson-Succop";
  msModel.material = creepData.material;
  msModel.Cms = Cms;

  creepMatrix = GetCreepMatrix( creepData );
  allP = ToK( creepMatrix.T).*Cms + log10( creepMatrix.tr );

  if( fitAll )
    trainData = creepMatrix;
    trainData.p = allP;
  else
    trainData.p = isoStressData.cK;
    trainData.stress = isoStressData.stress;
    trainData.T = GetIsoStressT( isoStressData );
  end

  msModel.masterCurve = FitMasterCurve(trainData , max(creepMatrix.stress*1.1) );


  if( !fitAll )
    msModel.masterCurve.allParameters = allP;
    msModel.masterCurve.allStress = creepMatrix.stress;
  end

  msModel.isoStress = isoStressData;
  
endfunction