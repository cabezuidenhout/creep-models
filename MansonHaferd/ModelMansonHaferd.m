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
  c = isoStressData.cK;
  m = isoStressData.mK;

  A = [ -m, ones( size(m) ) ];

  params = FitRegression(A,c);

  logta = params(2);
  Ta = params(1);

  mhModel.model = 'Manson-Haferd';
  mhModel.material = creepData.material;
  mhModel.logta = logta;
  mhModel.Ta = Ta;

  if( fitAll)
    trainData = GetCreepMatrix(creepData);
    trainData.p = (log10( trainData.tr ) - logta) ./ ( ToK(trainData.T) - Ta);
  else
    trainData.p = m;
    trainData.stress = isoStressData.stress;
    trainData.T = GetIsoStressT( isoStressData );
  end

  mhModel.masterCurve = FitMasterCurve(trainData);
  mhModel.isoStress = isoStressData;
endfunction