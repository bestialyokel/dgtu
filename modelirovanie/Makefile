CC=g++
CFLAGS=-c -Wall
LDFLAGS=
SOURCES= main.cpp include.cpp
DESTINATION=./bin/
OBJECTS=$(SOURCES:.cpp=.o)
EXECUTABLE=main.a

all: $(SOURCES) $(EXECUTABLE)
	
$(EXECUTABLE): $(OBJECTS) 
	$(CC) $(LDFLAGS) $(foreach obj, $(OBJECTS), ${DESTINATION}${obj}) -o $(DESTINATION)$@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $(DESTINATION)$@

clean:
	rm ${DESTINATION}*

