# Copyright © 2018 CA Bezuidenhout
# This file is part of creep-models.
#
# creep-models is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# creep-models is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with creep-models.  If not, see <http://www.gnu.org/licenses/>.
#=====================================================================
function isoStress = GetIsoStress( creepData, tolerance = 0)
  isoStress.tr = creepData.tr;

  for i=1:length(creepData.T)
    stressTemp = abs(creepData.stress - creepData.stress(i,1));

    validValues = (stressTemp <= tolerance);

    [validRows, validCols] = find(validValues);

    if( length(validCols) > 1 &&  (length( unique(validCols) ) == length( validCols ) ) )
      if( length(validCols) == length(validRows) ) 
        averageStress = 0;

        for j=1:length(validCols)
          averageStress += creepData.stress(validRows(j), validCols(j) );
          TTemp(j) = creepData.T(validRows(j));
        end

        if( isfield(isoStress, 'stress') )
          isoStress.stress( length(isoStress.stress) + 1) = averageStress / length(validCols);
          isoStress.T = vertcat(isoStress.T, TTemp);
          isoStress.tr = vertcat( isoStress.tr, creepData.tr);
        else
          isoStress.stress = averageStress / length(validCols);
          isoStress.T = TTemp;
          isoStress.tr = creepData.tr;
        endif
      end            
    end
  end

  isoStress.tolerance = tolerance;

  if( isfield( isoStress, 'stress') )
    isoStress.stress = isoStress.stress';
  end
endfunction