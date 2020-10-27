#include <GL/freeglut.h>
#include <GL/gl.h>

#include <vector>
#include <iostream>
#include <memory.h>

using namespace std;


int INIT_WIDTH = 300;
int INIT_HEIGHT = 300;

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
    
    do {
        for (auto i = 1; i < task.N; i++) {
            task.next[i] = task.cur[i] - y * (task.cur[i] - task.cur[i-1]);
        }

        memcpy(task.prev, task.cur, sizeof(double) * task.N);
        memcpy(task.cur, task.next, sizeof(double) * task.N);

        task.t0 += task.t;

    } while(task.t0 < task.T);

}

void centr(Task &task) {

    double y = task.a * task.t / task.h;
    
    do {
        for (auto i = 1; i < task.N - 1; i++) {
            task.next[i] = task.cur[i] - y * (task.cur[i+1] - task.cur[i-1]) / 2;
        }

        memcpy(task.prev, task.cur, sizeof(double) * task.N);
        memcpy(task.cur, task.next, sizeof(double) * task.N);

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
        
        memcpy(task.prev, task.cur, sizeof(double) * task.N);
        memcpy(task.cur, task.next, sizeof(double) * task.N);

        task.t0 += task.t;

    } while(task.t0 < task.T);

}


void hz(Task &task) {
    
    double y = task.a * task.t / task.h;

    do {
        for (auto i = 1; i < task.N; i++) {
            task.next[i] = task.cur[i] - y * (task.cur[i] - task.cur[i - 1]);
        }
        
        memcpy(task.prev, task.cur, sizeof(double) * task.N);
        memcpy(task.cur, task.next, sizeof(double) * task.N);

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

void resizeWindow(int w, int h) {

    glMatrixMode(GL_PROJECTION);
    glLoadIdentity();

    glViewport(0, 0, w, h);

    
    GLfloat xAspect = (GLfloat) INIT_WIDTH / w;
    GLfloat yAspect = (GLfloat) INIT_HEIGHT / h;
    glScalef(xAspect, yAspect, 0);

    glMatrixMode(GL_MODELVIEW);

    glutPostRedisplay();
}


void renderScene() {
    /*
    Task t;
    t.N = 50;
    t.h = 0.001;
    t.T = 3;
    t.t = 0.05;
    t.t0 = 0;
    t.a = 0.999;

    t.prev = (double*) calloc(t.N, sizeof(double));
    t.cur = (double*) calloc(t.N, sizeof(double));
    t.next = (double*) calloc(t.N, sizeof(double));

    t.prev[0] = 1;
    t.cur[0] = 1;

    ugol(t);
    //zdes cur
    reset(t);

    /*
    centr(t);
    //zdes cur
    cout << t.cur;
    reset(t);

    kabare(t);
    //zdes cur
    cout << t.cur;
    reset(t);

    hz(t);
    //zdes cur
    cout << t.cur;
    reset(t);

    */
   glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    glMatrixMode(GL_MODELVIEW);
        glLoadIdentity();


        glClearColor(0, 0, 0, 1.0f);

        glColor3f(1.0f, 0, 0);
        glutSolidSphere(1, 50, 50);

    glutSwapBuffers();
}

int main(int argc, char **argv) {

    
    glutInit(&argc, argv);


	glutInitDisplayMode(GLUT_DEPTH | GLUT_DOUBLE | GLUT_RGBA);
	glutCreateWindow("a");

    glutInitWindowSize(INIT_WIDTH, INIT_HEIGHT);

    glutReshapeFunc(resizeWindow);
	glutDisplayFunc(renderScene);


	glutMainLoop();


}