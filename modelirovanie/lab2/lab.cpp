#include <GL/freeglut.h>
#include <GL/gl.h>

#include <vector>
#include <iostream>
#include <memory.h>

#include <math.h>

using namespace std;


int INIT_WIDTH = 600;
int INIT_HEIGHT = 600;

typedef struct {
    size_t N;

    double h;
    double T;
    double t;
    double a;
    double t0;

    double* prev;
    double* cur;
    double* next;
} Task;

void ugol(Task &task) {

    double y = task.a * task.t / task.h;

    if (y > 1) {
        throw "y > 1";
        exit(0);
    }
    
    do {
        for (auto i = 1; i < task.N; i++) {
            task.next[i] = task.cur[i] - y * (task.cur[i] - task.cur[i-1]);
        }

        for (auto i = 0; i < task.N; i++) {
            task.prev[i] = task.cur[i];
            task.cur[i] = task.next[i];

        }

        task.t0 += task.t;

    } while(task.t0 < task.T);

}

void centr(Task &task) {

    double y = task.a * task.t / task.h;
    
    do {
        for (auto i = 1; i < task.N - 1; i++) {
            task.next[i] = task.cur[i] - y * (task.cur[i+1] - task.cur[i-1]) / 2;
        }

        for (auto i = 0; i < task.N; i++) {
            task.prev[i] = task.cur[i];
            task.cur[i] = task.next[i];

        }

        task.t0 += task.t;

    } while(task.t0 < task.T);

}

void kabare(Task &task) {
    
    double y = task.a * task.t / task.h;
    
    do {
        for (auto i = 1; i < task.N - 1; i++) {
            task.next[i] = 
                task.cur[i] 
                - task.cur[i-1] 
                + task.prev[i-1]
                - 2 * y * (task.cur[i] - task.cur[i+1]);
        }
        
        for (auto i = 0; i < task.N; i++) {
            task.prev[i] = task.cur[i];
            task.cur[i] = task.next[i];

        }

        task.t0 += task.t;

    } while(task.t0 < task.T);

}


void hz(Task &task) {
    
    double y = task.a * task.t / task.h;

    do {
        for (auto i = 1; i < task.N; i++) {
            task.next[i] = task.cur[i] - y * (task.cur[i] - task.cur[i - 1]);
        }

        for (auto i = 0; i < task.N; i++) {
            task.prev[i] = task.cur[i];
            task.cur[i] = task.next[i];

        }

        task.t0 += task.t;

    } while(task.t0 < task.T);

}


void reset(Task &task) {

    for (auto i = 0; i < task.N; i++) {
        task.cur[i] = 0;
        task.prev[i] = 0;
        task.next[i] = 0;
    }

    task.t0 = 0;
    task.prev[0] = 1;
    task.cur[0] = 1;
}

void drawPlot(GLfloat x, GLfloat y, const Task &t) {

    GLfloat p = 0.05;

    glLineWidth(0.5);
        
        glBegin(GL_LINES);
            //y
            glColor3f(1, 0, 0);
            glVertex2f(x + p, y + p);
            glVertex2f(x + p, y + 1 - p);

            glVertex2f(x + p, y + 1 - p);
            glVertex2f(x + p - 0.01, y + 1 - (p + 0.02));
            
            glVertex2f(x + p, y + 1 - p);
            glVertex2f(x + p + 0.01, y + 1 - (p + 0.02));


            //x
            glColor3f(0, 0, 1);
            glVertex2f(x + p, y + p);
            glVertex2f(x + 1 - p, y + p);


            glVertex2f(x + 1 - p, y + p);
            glVertex2f(x + 1 - (p + 0.02), y + p - 0.01);

            glVertex2f(x + 1 - p, y + p);
            glVertex2f(x + 1 - (p + 0.02), y + p + 0.01);

        glEnd();

        GLfloat x_o = 0;

        double max = -1;

        for (auto i = 0; i < t.N; i++) {
            double x = t.cur[i] < 0 ? -t.cur[i] : t.cur[i];
            if (x > max) {
                max = x;
            }
        }

        cout << max << endl;

        glBegin(GL_LINE_STRIP);
            glColor3f(0, 1, 0);

            for (auto i = 0; i < t.N; i++) {
                x_o = ( (GLfloat) i / t.N);
                glVertex2f(x + p + x_o, y + p + t.cur[i] / (max + p) /2 );
            }

        glEnd();



}

void renderScene() {
    
    Task t;
    t.N = 150;
    t.h = 1;
    t.T = 3;
    t.t = 0.05;
    t.t0 = 0;
    t.a = 0.98;

    t.prev = (double*) calloc(t.N, sizeof(double));
    t.cur = (double*) calloc(t.N, sizeof(double));
    t.next = (double*) calloc(t.N, sizeof(double));

    t.prev[0] = 1;
    t.cur[0] = 1;


   glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

   glClearColor(0, 0, 0, 1.0f);


    cout << "step: " << t.h << endl; 
    cout << "dots: " << t.N << endl; 
    cout << "t: " << t.t << endl; 
    cout << "T: " << t.T << endl; 

    glMatrixMode(GL_MODELVIEW);
        glLoadIdentity();


        glClearColor(0, 0, 0, 1.0f);


        glLineWidth(0.5);


        ugol(t);
        //zdes cur
        drawPlot(-1, 0, t);
        reset(t);
        
        centr(t);
        //zdes cur
        drawPlot(0, 0, t);
        reset(t);

        kabare(t);
        //zdes cur
        //drawPlot(-0.3, -0.3, t);
        drawPlot(-1, -1, t);
        reset(t);

        hz(t);
        //zdes cur
        drawPlot(0, -1, t);
        reset(t);
    
    glutSwapBuffers();
}

int main(int argc, char **argv) {

    
    glutInit(&argc, argv);


	glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
	glutCreateWindow("a");

    glutInitWindowSize(INIT_WIDTH, INIT_HEIGHT);

	glutDisplayFunc(renderScene);


	glutMainLoop();


}