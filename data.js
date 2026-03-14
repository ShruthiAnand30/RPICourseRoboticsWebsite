// ================================================
// ROBOTICS KITS DATA
// ================================================

const roboticsKits = [
    {
        id: 'dofbot',
        name: 'DOFBOT-JetsonNANO',
        description: 'The DOFBOT robotic arm utilizes the NVIDIA Jetson Nano platform. Students in Robotics 1 use this platform to explore fundamental robotics concepts through Python programming. In addition to the powerful Jetson platform, the arms are also equipped with a two finger gripper and RGB camera.',
        image: 'dofbot.jpg',
        difficulty: 'Manipulator, Kinematics & Dynamics',
        tags: ['AI vision', 'Robotics Education', 'Automation'],
        sections: [
            {
                id: 'introduction',
                label: 'Introduction',
                content: `
                    <h2>Introduction — Important Notes</h2>
                    <div class="doc-note warning">
                        <strong>Please read carefully before operating the arm.</strong>
                    </div>
                    <ul>
                        <li>Collision avoidance is <strong>not</strong> built-in by default. <strong>USE CAUTION</strong> when moving joints. Self-collision may occur.</li>
                        <li>During early testing, the servo for the gripper started feeling warm. Keep this in mind and shut down if it starts getting hot to the touch.</li>
                        <li>The joint range is 0–180 degrees for each joint (except joint 5). The Python module may let you specify a number outside this range — do not do this. If a joint angle is outside [0, 180] degrees, the read function will return nil.</li>
                        <li>Use caution when commanding near 0 or 180 degrees. Gravitational forces may result in an actual angle &lt;0 or &gt;180, causing the read angle function to return nil.</li>
                        <li>Fast movements may produce forces which can dislodge the suction cups.</li>
                        <li>If running code or the app and the arm is not moving, turn it off and back on.</li>
                        <li>If code is not running (JupyterLab may display an I2C error), type <code>i2cdetect -r -y 1</code> into a terminal. You should see the number <code>15</code> in the matrix (along with a <code>3c</code>). If you do not see <code>15</code>, press the reset button on the expansion board (the large board on the bottom).</li>
                    </ul>
                    <h3>Starting Up</h3>
                    <ul>
                        <li>Ensure the robot is plugged in.</li>
                        <li>If accessing DOFBOT's internal computer directly, connect mouse, keyboard, and monitor.</li>
                        <li>Log into your assigned username (e.g. <code>group2</code>). The password will be the same as your username.</li>
                        <li>If using the camera, remove the cap. <strong>Replace the camera cap when done using the arm.</strong></li>
                        <li>The power switch is located on the bottom board, near the antennas.</li>
                    </ul>
                `
            },
            {
                id: 'first-trial',
                label: 'First Trial',
                content: `
                    <h2>First Trial — Precautions</h2>
                    <div class="doc-note warning">
                        <strong>Note:</strong> When the robot arm is gripping objects, it is necessary to control the angle of the gripper. Improper angle setting may cause the servo to stall and burn.
                    </div>
                    <p>Use the gripper angle reference table below, which records the angle the servo needs to be set to for every 0.5 cm of object width. Adjust the angle you set when gripping according to this table to avoid stalling the servo.</p>
                    <table class="doc-table">
                        <thead><tr><th>Object Length (cm)</th><th>Servo Angle (°)</th></tr></thead>
                        <tbody>
                            <tr><td>0</td><td>180</td></tr>
                            <tr><td>0.5</td><td>176</td></tr>
                            <tr><td>1.0</td><td>168</td></tr>
                            <tr><td>1.5</td><td>160</td></tr>
                            <tr><td>2.0</td><td>152</td></tr>
                            <tr><td>2.5</td><td>143</td></tr>
                            <tr><td>3.0</td><td>134</td></tr>
                            <tr><td>3.5</td><td>125</td></tr>
                            <tr><td>4.0</td><td>115</td></tr>
                            <tr><td>4.5</td><td>105</td></tr>
                            <tr><td>5.0</td><td>95</td></tr>
                            <tr><td>5.5</td><td>80</td></tr>
                            <tr><td>6.0</td><td>57</td></tr>
                            <tr><td>6.0–6.4</td><td>0–57</td></tr>
                        </tbody>
                    </table>
                `
            },
            {
                id: 'preparation',
                label: 'Preparation',
                content: `
                    <h2>Preparation — Start up JupyterLab</h2>
                    <p>Make sure DOFBOT and your computer are on the same LAN. The lab WiFi is <strong>Duckietown</strong>, password: <code>quackquack</code>.</p>
                    <h3>Accessing JupyterLab</h3>
                    <p>If your DOFBOT is connected to the same LAN as your PC via WiFi, access its JupyterLab by entering the DOFBOT's IP address followed by port <code>888X</code> in your browser, where X is your group number.</p>
                    <ul>
                        <li>Group 1 → port <code>8881</code> &nbsp;|&nbsp; Group 2 → port <code>8882</code> &nbsp;|&nbsp; etc.</li>
                        <li>General student account → port <code>8880</code></li>
                        <li>Admin jetson account → port <code>8888</code></li>
                        <li>Password is the same as the DOFBOT account username (e.g. group1 → password: <code>group1</code>)</li>
                    </ul>
                    <p>Example URL: <code>http://192.168.1.67:8881/</code> — replace the IP with your actual DOFBOT IP address.</p>
                    <h3>Running Code in JupyterLab</h3>
                    <ol>
                        <li>Navigate into the <strong>readonly_examples</strong> directory, then enter <strong>Dofbot</strong>.</li>
                        <li>Enter a folder to access its code files.</li>
                        <li>Click the <strong>Run</strong> button in the top menu to execute the code.</li>
                        <li>To exit and run another program, click the <strong>Kernel</strong> menu and open a different file.</li>
                    </ol>
                    <div class="doc-note">
                        <strong>Tip:</strong> To stop a running program, click the <strong>Stop</strong> button on the JupyterLab toolbar.
                    </div>
                `
            },
            {
                id: 'basic-control-course',
                label: 'Basic control course',
                content: `
                    <h2>Basic Control Course</h2>

                    <h3>1. Control RGB Light</h3>
                    <p>The underlying driver is packaged into the <code>Arm_Lib</code> Python library, pre-installed in the system image.</p>
                    <p><strong>API:</strong> <code>Arm_RGB_set(R, G, B)</code> — Sets RGB light color. Each channel ranges 0–255.</p>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/1.rgb.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

def main():
    while True:
        Arm.Arm_RGB_set(50, 0, 0)   # Red
        time.sleep(.5)
        Arm.Arm_RGB_set(0, 50, 0)   # Green
        time.sleep(.5)
        Arm.Arm_RGB_set(0, 0, 50)   # Blue
        time.sleep(.5)
        print(" END OF LINE! ")

try:
    main()
except KeyboardInterrupt:
    del Arm
    print(" Program closed! ")</code></pre>

                    <hr/>
                    <h3>2. Control Buzzer</h3>
                    <p><strong>API:</strong></p>
                    <pre><code>Arm_Buzzer_On(delay=255)
# delay 1–50: 1=100ms, 2=200ms … 50=5s. 255 = continuous until manually stopped.

Arm_Buzzer_Off()
# No parameters. Turns off the buzzer.</code></pre>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/2.beep.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

Arm.Arm_Buzzer_On(1)   # 100ms beep
time.sleep(1)
Arm.Arm_Buzzer_On(3)   # 300ms beep
time.sleep(1)
Arm.Arm_Buzzer_On()    # Continuous beep
time.sleep(1)
Arm.Arm_Buzzer_Off()
time.sleep(1)

del Arm</code></pre>

                    <hr/>
                    <h3>3. Control Single Servo</h3>
                    <p><strong>API:</strong> <code>Arm_serial_servo_write(id, angle, time)</code></p>
                    <ul>
                        <li><code>id</code>: 1–6 (1 = base, 6 = gripper)</li>
                        <li><code>angle</code>: 0–180 (servo 5: 0–270)</li>
                        <li><code>time</code>: run duration in ms (0 = fastest)</li>
                    </ul>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/3.ctrl_servo.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

id = 6
Arm.Arm_serial_servo_write(id, 90, 500)
time.sleep(1)

def main():
    while True:
        Arm.Arm_serial_servo_write(id, 120, 500)
        time.sleep(1)
        Arm.Arm_serial_servo_write(id, 50, 500)
        time.sleep(1)
        Arm.Arm_serial_servo_write(id, 120, 500)
        time.sleep(1)
        Arm.Arm_serial_servo_write(id, 180, 500)
        time.sleep(1)

try:
    main()
except KeyboardInterrupt:
    print(" Program closed! ")

del Arm</code></pre>

                    <hr/>
                    <h3>4. Read Servo Angle</h3>
                    <p><strong>API:</strong> <code>Arm_serial_servo_read(id)</code> — Returns current angle (servo 5: 0–270, others: 0–180).</p>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/4.ctrl_servo.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

def main():
    while True:
        for i in range(6):
            aa = Arm.Arm_serial_servo_read(i+1)
            print(aa)
            time.sleep(.01)
        time.sleep(.5)
        print(" END OF LINE! ")

try:
    main()
except KeyboardInterrupt:
    print(" Program closed! ")

# Read after commanding a specific angle
id = 6
Arm.Arm_serial_servo_write(id, 150, 500)
time.sleep(1)
aa = Arm.Arm_serial_servo_read(id)
print(aa)
del Arm</code></pre>

                    <hr/>
                    <h3>5. Control All Servos</h3>
                    <p><strong>API:</strong> <code>Arm_serial_servo_write6(S1, S2, S3, S4, S5, S6, time)</code></p>
                    <ul>
                        <li>S1–S4, S6: 0–180 &nbsp;|&nbsp; S5: 0–270 &nbsp;|&nbsp; time: run duration in ms</li>
                    </ul>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/5.ctrl_all.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

def ctrl_all_servo(angle, s_time=500):
    Arm.Arm_serial_servo_write6(angle, 180-angle, angle, angle, angle, angle, s_time)
    time.sleep(s_time/1000)

def main():
    dir_state = 1
    angle = 90
    Arm.Arm_serial_servo_write6(90, 90, 90, 90, 90, 90, 500)
    time.sleep(1)
    while True:
        if dir_state == 1:
            angle += 1
        if angle >= 180:
            dir_state = 0
        else:
            angle -= 1
        if angle <= 0:
            dir_state = 1
        ctrl_all_servo(angle, 10)
        time.sleep(10/1000)

try:
    main()
except KeyboardInterrupt:
    print(" Program closed! ")

del Arm</code></pre>

                    <hr/>
                    <h3>6. DOFBOT Grab Block</h3>
                    <p>Move blocks from the gray area in the middle to the surrounding colored square areas. Place one block at a time in the gray area and run the corresponding code unit.</p>
                    <div class="doc-note warning">
                        <strong>Note:</strong> Execute code cell by cell — not all at once. Place one block in the gray area before each pick operation.
                    </div>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/9.clamp_block.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

def arm_clamp_block(enable):
    if enable == 0:
        Arm.Arm_serial_servo_write(6, 60, 400)
    else:
        Arm.Arm_serial_servo_write(6, 130, 400)
        time.sleep(.5)

def arm_move(p, s_time=500):
    for i in range(5):
        id = i + 1
        if id == 5:
            time.sleep(.1)
            Arm.Arm_serial_servo_write(id, p[i], int(s_time*1.2))
        else:
            Arm.Arm_serial_servo_write(id, p[i], s_time)
        time.sleep(.01)
    time.sleep(s_time/1000)

def arm_move_up():
    Arm.Arm_serial_servo_write(2, 90, 1500)
    Arm.Arm_serial_servo_write(3, 90, 1500)
    Arm.Arm_serial_servo_write(4, 90, 1500)
    time.sleep(.1)

p_mould  = [90, 130,  0,  0,  90]
p_top    = [90,  80, 50, 50, 270]
p_Brown  = [90,  53, 33, 36, 270]
p_Yellow = [65,  22, 64, 56, 270]
p_Red    = [117, 19, 66, 56, 270]
p_Green  = [136, 66, 20, 29, 270]
p_Blue   = [44,  66, 20, 28, 270]

# Ready position
arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Grab from gray → place on Yellow
arm_move(p_top, 1000)
arm_move(p_Brown, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Yellow, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Grab from gray → place on Red
arm_move(p_top, 1000)
arm_move(p_Brown, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Red, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)

del Arm</code></pre>

                    <hr/>
                    <h3>7. Porter</h3>
                    <p>Stack four colored blocks bottom-to-top in the order <strong>blue → green → red → yellow</strong> on the gray square. The arm will carry each block to its matching colored area.</p>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/10.move_block.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

# (Same arm_clamp_block, arm_move, arm_move_up functions as above)

p_layer_4 = [90, 72, 49, 13, 270]
p_layer_3 = [90, 66, 43, 20, 270]
p_layer_2 = [90, 63, 34, 30, 270]
p_layer_1 = [90, 53, 33, 36, 270]

arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Layer 4 (yellow) → Yellow area
arm_move(p_top, 1000)
arm_move(p_layer_4, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Yellow, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)

# Layer 3 → Red, Layer 2 → Green, Layer 1 → Blue (same pattern)
del Arm</code></pre>

                    <hr/>
                    <h3>8. Stacked Arhat</h3>
                    <p>The reverse of Porter. Place blocks spread out in their colored areas; the arm stacks them in the center gray area in the order <strong>yellow → red → green → blue</strong>.</p>
                    <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/11.heap_up.ipynb</code></p>
                    <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

Arm = Arm_Device()
time.sleep(.1)

# (Same helper functions as above)

p_layer_4 = [90, 76, 40, 17, 270]
p_layer_3 = [90, 65, 44, 17, 270]
p_layer_2 = [90, 65, 25, 36, 270]
p_layer_1 = [90, 48, 35, 30, 270]

arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Yellow → Layer 1 (bottom)
arm_move(p_top, 1000)
arm_move(p_Yellow, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_layer_1, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1100)

# Red → Layer 2, Green → Layer 3, Blue → Layer 4 (same pattern)
del Arm</code></pre>

                    <hr/>
                    <h3>9. USB Camera Display</h3>
                    <p>Code path: <code>/home/jetson/Dofbot/5.AI_Visual/0.Camera Driver Tutorial.ipynb</code></p>
                    <pre><code>import cv2
import ipywidgets.widgets as widgets

image_widget = widgets.Image(format='jpeg', width=600, height=500)
display(image_widget)

def bgr8_to_jpeg(value, quality=75):
    return bytes(cv2.imencode('.jpg', value)[1])

image = cv2.VideoCapture(0, cv2.CAP_V4L2)
ret, frame = image.read()
image_widget.value = bgr8_to_jpeg(frame)</code></pre>
                    <div class="doc-note">
                        <strong>Reminder:</strong> Remove the camera cap before use. Replace it when done.
                    </div>
                `
            },
            {
                id: 'opencv-course',
                label: 'OpenCV course',
                content: `
                    <h2>OpenCV Course</h2>

                    <h3>1. Introduction to Open Source CV</h3>
                    <p>OpenCV (Open Source Computer Vision Library) is an open-source API library for computer vision, usable freely in both research and commercial applications. It is widely used for intrusion detection, target tracking, face detection and recognition, and more.</p>
                    <ul>
                        <li>OpenCV Official: <a href="https://www.opencv.org/" target="_blank">opencv.org</a></li>
                        <li>OpenCV Chinese Forum: <a href="http://www.opencv.org.cn/" target="_blank">opencv.org.cn</a></li>
                        <li>OpenCV CSDN Forum: <a href="https://bbs.csdn.net/forums/OpenCV" target="_blank">bbs.csdn.net/forums/OpenCV</a></li>
                    </ul>

                    <hr/>
                    <h3>2. Image Reading and Display</h3>
                    <p><strong>API:</strong> <code>img = cv2.imread('yahboom.jpg', flag)</code></p>
                    <ul>
                        <li><code>-1</code> / <code>cv2.IMREAD_UNCHANGED</code> — Keep original format</li>
                        <li><code>0</code> / <code>cv2.IMREAD_GRAYSCALE</code> — Grayscale</li>
                        <li><code>1</code> / <code>cv2.IMREAD_COLOR</code> — Color (default)</li>
                        <li><code>2</code> / <code>cv2.IMREAD_UNCHANGED</code> — Include alpha channel</li>
                    </ul>
                    <p><strong>Display API:</strong> <code>cv2.imshow('window_name', frame)</code></p>
                    <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/1.OpenCV_Getting_started/01_OpenCV_image_read_display.ipynb</code></p>
                    <pre><code>import cv2
import ipywidgets.widgets as widgets

def bgr8_to_jpeg(value, quality=75):
    return bytes(cv2.imencode('.jpg', value)[1])

img = cv2.imread('yahboom.jpg', 1)
image_widget = widgets.Image(format='jpg', width=800, height=800)
display(image_widget)
image_widget.value = bgr8_to_jpeg(img)</code></pre>

                    <hr/>
                    <h3>3. Grayscale Processing</h3>
                    <p>Grayscale converts a color image so that R = G = B (the grayscale value), reducing computation for downstream tasks. Pixels with higher values are brighter (255 = white); lower values are darker (0 = black).</p>
                    <p>Common algorithms: <strong>Max value</strong>, <strong>Average</strong>, and <strong>Weighted average</strong> (<code>gray = R×0.299 + G×0.587 + B×0.114</code> — best for human perception).</p>
                    <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/3.IP_Draw_text_line_segments/01_Grayscale_processing.ipynb</code></p>
                    <pre><code># Method 1 — imread flag 0
import cv2, matplotlib.pyplot as plt
img0 = cv2.imread('yahboom.jpg', 0)
img_rgb = cv2.cvtColor(img0, cv2.COLOR_BGR2RGB)
plt.imshow(img_rgb); plt.show()

# Method 2 — cvtColor
img = cv2.imread('yahboom.jpg', 1)
dst = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Method 3 — Average: gray = (R+G+B)/3

# Method 4 — Weighted average: gray = R*0.299 + G*0.587 + B*0.114</code></pre>

                    <hr/>
                    <h3>4. Binary Image</h3>
                    <p>Binarization sets a threshold: pixels above it become 255 (white) or 0 (black), producing a black-and-white image. OpenCV provides five threshold types via <code>cv2.threshold(src, threshold, maxValue, method)</code>:</p>
                    <ul>
                        <li><code>THRESH_BINARY</code> — Above threshold → maxValue, below → 0</li>
                        <li><code>THRESH_BINARY_INV</code> — Above → 0, below → maxValue</li>
                        <li><code>THRESH_TRUNC</code> — Above → threshold, below unchanged</li>
                        <li><code>THRESH_TOZERO</code> — Above → 0, below unchanged</li>
                        <li><code>THRESH_TOZERO_INV</code> — Above unchanged, below → 0</li>
                    </ul>
                    <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/3.IP_Draw_text_line_segments/02Image_Binarization.ipynb</code></p>
                    <pre><code>import cv2, numpy as np, matplotlib.pyplot as plt

img = cv2.imread('yahboom.jpg', 1)
GrayImage = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

ret, thresh1 = cv2.threshold(GrayImage, 10, 255, cv2.THRESH_BINARY)
ret, thresh2 = cv2.threshold(GrayImage, 10, 255, cv2.THRESH_BINARY_INV)
ret, thresh3 = cv2.threshold(GrayImage, 10, 255, cv2.THRESH_TRUNC)
ret, thresh4 = cv2.threshold(GrayImage, 10, 255, cv2.THRESH_TOZERO)
ret, thresh5 = cv2.threshold(GrayImage, 10, 255, cv2.THRESH_TOZERO_INV)

titles = ['Gray Image','BINARY','BINARY_INV','TRUNC','TOZERO','TOZERO_INV']
images = [GrayImage, thresh1, thresh2, thresh3, thresh4, thresh5]
for i in range(6):
    plt.subplot(2, 3, i+1), plt.imshow(images[i], 'gray')
    plt.title(titles[i])
    plt.xticks([]), plt.yticks([])
plt.show()</code></pre>

                    <hr/>
                    <h3>5. Edge Detection (Canny)</h3>
                    <p>Canny edge detection is a standard algorithm that significantly reduces image data while retaining structural information. It works in five steps: Gaussian smoothing → gradient calculation → non-maximum suppression → double-threshold detection → edge suppression.</p>
                    <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/3.IP_Draw_text_line_segments/03_1edge_detection1.ipynb</code></p>
                    <pre><code># Method 1 — Canny
import cv2, numpy as np, matplotlib.pyplot as plt

img = cv2.imread('image0.jpg', 1)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgG = cv2.GaussianBlur(gray, (3,3), 0)
dst = cv2.Canny(img, 50, 50)

img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img_rgb); plt.show()

dst_rgb = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
plt.imshow(dst_rgb); plt.show()</code></pre>
                    <pre><code># Method 2 — Sobel operator (manual implementation)
import cv2, numpy as np, math

img = cv2.imread('image0.jpg', 1)
imgInfo = img.shape
height, width = imgInfo[0], imgInfo[1]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
dst = np.zeros((height, width, 1), np.uint8)

for i in range(0, height-2):
    for j in range(0, width-2):
        gy = (gray[i,j]*1 + gray[i,j+1]*2 + gray[i,j+2]*1
             - gray[i+2,j]*1 - gray[i+2,j+1]*2 - gray[i+2,j+2]*1)
        gx = (gray[i,j] + gray[i+1,j]*2 + gray[i+2,j]
             - gray[i,j+2] - gray[i+1,j+2]*2 - gray[i+2,j+2])
        grad = math.sqrt(gx*gx + gy*gy)
        dst[i,j] = 255 if grad > 50 else 0</code></pre>
                `
            },
            {
                id: 'app',
                label: 'App',
                content: `
                    <h2>App Control</h2>

                    <h3>Turn On App Control</h3>
                    <pre><code>python3 ~/Desktop/Arm/YahboomArm.pyc</code></pre>

                    <h3>Turn Off App Control</h3>
                    <p>Run the following command in a <strong>new terminal</strong>:</p>
                    <pre><code>bash ~/Desktop/readonly_examples/Dofbot/kill_YahboomArm.sh</code></pre>

                    <h3>Remote Control Interface</h3>
                    <p>Click the <strong>Remote Control</strong> icon in the app. The camera stream is displayed on the left side. Servos 1–6 are shown on the schematic diagram — the currently selected servo number turns red.</p>
                    <p>Adjust the angle of the selected servo by dragging the slider or pressing the left/right buttons.</p>
                    <ul>
                        <li><strong>[Angle]</strong> — Reads the current servo angle and updates the slider to match.</li>
                        <li><strong>[Middle]</strong> — Returns DOFBOT to its initial state.</li>
                        <li><strong>[Stop]</strong> — Closes torque and stops receiving control commands. The arm can then be moved manually. Click again to re-enable torque and return to initial state.</li>
                    </ul>
                `
            }
        ]
    },
    {
        id: 'rosmaster',
        name: 'ROSMASTER X3',
        description: 'The Rosmaster X3 is an advanced mobile robot with ROS (Robot Operating System). This repository contains setup instructions, control code, and sensor integration examples for using the Rosmaster X3 with various programming environments. Students can learn SLAM (Simultaneous Localization and Mapping), exploring autonomous navigation, and working with sensors like LIDAR and cameras.',
        image: 'rosmaster.jpg',
        difficulty: 'Intro to Robot Programming',
        tags: ['ROS', 'SLAM', 'LIDAR'],
        sections: [
            {
                id: 'overview',
                label: 'Overview',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'getting-started',
                label: 'Getting Started',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'motor-control',
                label: 'Motor Control',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'lidar',
                label: 'LIDAR Setup',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'navigation',
                label: 'Navigation & SLAM',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            }
        ]
    },
    {
        id: 'raspbot',
        name: 'Raspbot V2',
        description: 'The Raspbot V2 is a beginner-friendly robot car that runs on the Raspberry Pi. This repository includes code and documentation for setting up the Raspbot, controlling its movement, and incorporating basic computer vision features. This repo teaches students motor control, obstacle avoidance, and basic computer vision using Python.',
        image: 'raspbot.jpg',
        difficulty: 'Robotics 2',
        tags: ['Raspberry Pi', 'Educational', 'Python'],
        sections: [
            {
                id: 'overview',
                label: 'Overview',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'getting-started',
                label: 'Getting Started',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'motor-control',
                label: 'Motor Control',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'sensors',
                label: 'Sensors',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'projects',
                label: 'Example Projects',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            }
        ]
    },
    {
        id: 'dogzilla',
        name: 'Dogzilla',
        description: 'Quadruped robot dog with advanced locomotion and dynamic balance control.',
        image: 'dogzilla.jpg',
        difficulty: 'Intro to Robot Programming',
        tags: ['Quadruped', 'Locomotion', 'Balance'],
        sections: [
            {
                id: 'overview',
                label: 'Overview',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'getting-started',
                label: 'Getting Started',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'gait',
                label: 'Gait Patterns',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'balance',
                label: 'Balance Control',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            }
        ]
    }
];

window.roboticsKits = roboticsKits;