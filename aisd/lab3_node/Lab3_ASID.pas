type
  stat_segm = array [1..32] of integer;
  dinam_segm = array[1..128] of integer;

var
  stat: stat_segm;
  din: dinam_segm;

procedure NewPointer(znach: byte; tip: integer);
var
  i, sum: integer;
  adr: integer;
begin
  adr := 0;
  
  for i := 1 to 128 do
    if (din[i] = -1 ) then
    begin
      adr := i;
      break;
    end;
  
  if (adr = 0) then
  begin
    Writeln('Динамический сегмент переполнен');
    exit;
  end;
  
  if (adr + tip * 8 - 1 > 128) then exit;
  
  for i := 1 to 32 do
    if (stat[i] = -1) then
    begin
      if (i + 2 < 33) then
      begin
        stat[i] := znach;
        stat[i + 1] := tip;
        stat[i + 2] := adr;
        break;
      end 
      else
      begin
        Writeln('Статический сегмент переполнен');
        exit;
      end;
    end;
  
end;

procedure WritePointer(name, znach: integer  );
var
  i, j: integer;
  index: integer;
begin
  
  for i := 1 to 32 do
    if (stat[i] = name) then 
      index := i;
  
  for i := stat[index + 2] to stat[index + 1] * 8 + stat[index + 2] - 1 do
    din[i] := 0;
  
  for i := stat[index + 1] * 8 + stat[index + 2]-1   downto stat[index + 2] do
  begin
    j := znach mod 10;
    din[i] := j;
    znach := znach div 10;
  
    {if (znach < 9) then
    begin
      din[i - 1] := znach;
      break;
    end;}
    
  end;
  
end;

procedure ReadPointer(name: byte);
var
  i: integer;
  index: integer;
begin
  
  for i := 1 to 32 do
    if (stat[i] = name) then index := i;
  
  for i := stat[index + 2] to stat[index + 2] + stat[index + 1] * 8 - 1 do
    Write(din[i]);
  
  Writeln;
  
end;

procedure SetPointer(name1, name2: byte);
var
  i: integer;
  index1, index2: integer;
begin
  
  for i := 1 to 32 do
    if (stat[i] = name1) then index1 := i;
  
  for i := 1 to 32 do
    if (stat[i] = name2) then index2 := i;
  
  i := stat[index1];
  stat[index1] := stat[index2];
  stat[index2] := i;
  
end;

procedure FreePointer(name: byte);
var
  i: integer;
  index: integer;
begin
  
  for i := 1 to 32 do
    if (stat[i] = name) then index := i;
  
  for i := stat[index + 2] to stat[index + 2] + 8 * stat[index + 1] - 1 do
    din[i] := -1;
  
  stat[index] := -1;
  stat[index + 1] := -1;
  stat[index + 2] := -1;
  
  
end;

procedure print_data();
begin
for var i:=1 to 32 do
Write(din[i],' ');
Writeln();
for var i:=32 to 64 do
Write(din[i],' ');
Writeln();
for var i:=64 to 96 do
Write(din[i],' ');
Writeln();
for var i:=96 to 128 do
Write(din[i],' ');
Writeln();
end;

begin
  
  for var i := 1 to 128 do
  begin
    din[i] := -1;
  end;
  
  
  for var i := 1 to 32 do
  begin
    stat[i] := -1;
  end;

var vvod: integer;

repeat

repeat 

  Writeln('1) New Pointer');
  Writeln('2) Write Pointer');
  Writeln('3) Read Pointer');
  Writeln('4) Set Pointer');
  Writeln('5) Free Pointer');
  Writeln('6) Print');
  Writeln('7) Exit');
  Readln(vvod);

until (vvod <> 7);

 case vvod of
 
 1:begin
  var i: char;
  var j: integer;
  Writeln('Введите имя указателя(символ)');
  Readln(i);
  Writeln('Введите тип указателя (1,2,3,4)');
  Readln(j);
  NewPointer(ord(i),j);
   end;
   
 2:begin
   var i: char; var j: integer;
   Writeln('Введите имя нужного указаля');
   Readln(i);
   Writeln('Введите значение');
   Readln(j);
   WritePointer(ord(i),j); 
  end;
  
  3: begin
    var i:char;
    Writeln('Введите имя нужного указаля');
   Readln(i);
   ReadPointer(ord(i));
    end;
  4:begin
    var i,j:char;
    Writeln('Введите имя 1-ого указаля');
   Readln(i);
   Writeln('Введите имя 2-ого указаля');
   Readln(j);
   SetPointer(ord(i),ord(j));
    end; 
  5:begin
   var i:char;
    Writeln('Введите имя нужного указаля');
   Readln(i);
   FreePointer(ord(i));
   
  end;
  
  6:begin
  print_data;
  end;
  
  end; 
  
  until (3<2);
  
end.