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
function X = nOrderX( x, n) 
  if( ( size(x,1) == 1) || ( size(x,2) == 1) )
    if( size(x,1) == 1)
      x = x';      
    end

    if( n > 0)
      X = [ ones(length(x),1) , zeros(length(x),n-1) ];

      for i=1:n
        X(:,i+1) = x.^i;
      end
    else
      X = ones(length(x),1);
    end
  else
    printf('Column or row vector expected. %dx%d Matrix received\n', size(x,1), size(x,2) );
  end
endfunction