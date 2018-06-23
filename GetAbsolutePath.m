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
function absPath = GetAbsolutePath( mfilename )
  fileExtension = strsplit(mfilename, '.');

  if( ( length(fileExtension) == 2 ) && ( fileExtension{2} == 'm') )
    absPath = file_in_loadpath( mfilename );
    absPath = substr( absPath, 1, strfind(absPath, mfilename)-2);
  else
    absPath = -1;
    printf('!!! Invalid m-file name\n');
  endif
endfunction