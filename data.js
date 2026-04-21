// ================================================
// ROBOTICS KITS DATA
// ================================================

const roboticsKits = [
    {
        id: 'dofbot',
        name: 'DOFBOT-JetsonNANO',
        description: 'The DOFBOT robotic arm utilizes the NVIDIA Jetson Nano platform. Students in Robotics 1 use this platform to explore fundamental robotics concepts through Python programming. In addition to the powerful Jetson platform, the arms are also equipped with a two finger gripper and RGB camera.',
        image: 'images/index/dofbot.jpg',
        difficulty: 'Manipulator, Kinematics & Dynamics',
        tags: ['NVIDIA Jetson Nano', 'Python', 'ROS1', 'Visual Servoing'],
        sections: [
            {
                id: 'introduction',
                label: 'Introduction',
                                content: `<h2>Introduction</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    {
                        id: 'intro-notes',
                        label: 'Important Notes',
                        content: `
                            <h2>Some Important Notes</h2>
                            <ul>
                                <li>Collision avoidance is not built-in by default. <strong>USE CAUTION</strong> when moving joints. Self-collision may occur.</li>
                                <li>During early testing, the servo for the gripper started feeling warm. Keep this in mind and shut down if it starts getting hot to the touch.</li>
                                <li>The joint range is 0-180 degrees for each joint (except joint 5). The python module for controlling the servos may let you specify a number outside this range. However, if the joint angle is outside [0,180] degrees, the read function will return nil. Therefore, do not command the joints outside [0,180] degrees.</li>
                                <li>Use caution when commanding near 0 or 180 degrees. Gravitational forces may result in an actual angle &lt;0 or &gt;180. This would make the read angle function return nil.</li>
                                <li>Fast movements may produce forces which can dislodge the suction cups.</li>
                                <li>If running code or the app and the arm is not moving, turn it off and back on.</li>
                                <li>If code is not running (JupyterLab may display I2C error), type into a terminal <code>i2cdetect -r -y 1</code>. You should see the number 15 in the matrix that appears (The main elements will be '-'. You will also see a 3c.). If you do not see 15, press the reset button on the expansion board (the large board on the bottom).</li>
                            </ul>
                        `
                    },
                    {
                        id: 'intro-startup',
                        label: 'Starting Up',
                        content: `
                            <h2>Starting Up</h2>
                            <ul>
                                <li>Ensure robot is plugged in.</li>
                                <li>If accessing Dofbot's internal computer directly, connect mouse, keyboard, and monitor.</li>
                                <li>Log into your assigned username (e.g. group2). The password will be the same as your user name.</li>
                                <li>If using camera, remove cap. <strong>Replace camera cap when done using arm.</strong></li>
                                <li>Power switch is located on the bottom board, near the antennas.</li>
                            </ul>
                        `
                    }
                ],
                content: `<h2>Introduction</h2><p>Select a subsection to get started.</p>`
            },
            {
                id: 'first-trial',
                label: 'First Trial',
                content: `
                    <h2>Precautions for DIY Robotic Arm</h2>
                    <div class="doc-note warning">
                        <strong>Note: When the robot arm is gripping objects, it is necessary to control the angle of the gripper. Improper angle setting may cause the servo to stall and burn.</strong>
                    </div>
                    <p>Here is a table of gripper angles, which records the angle that the servo needs to be set to for every 0.5 cm object. You can adjust the angle you set when gripping according to this table to avoid stalling the servo.</p>
                    <img src="images/Dofbot/First_Trial/First_Trial_1.png" alt="Showing the Object length from the gripper." style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                    <table class="doc-table">
                        <thead><tr><th>Object length (unit: cm)</th><th>Servo angle (unit: degree)</th></tr></thead>
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
                                content: `<h2>Preparation</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    {
                        id: 'prep-access',
                        label: 'Accessing JupyterLab',
                        content: `
                            <h2>Start JupyterLab</h2>
                            <p><strong>Make DOFBOT and your computer on the same LAN (the lab WiFi is Duckietown, password: quackquack)</strong></p>
                            <ol>
                                <li>
                                    If your DOFBOT is connected to the same LAN as your PC via WiFi, you can access its Jupyter Lab by entering the DOFBOT's IP address followed by port <code>888X</code> in your browser, where X is the group number.
                                    <br><br>
                                    For example, if you are using account group1, you can access Jupyter Lab through port 8881. For group2, it will be at 8882, etc.
                                    <br><br>
                                    The general access student account is accessible at port 8880, and the admin jetson account is accessible at port 8888.
                                    <br><br>
                                    Password will be the same as the Dofbot account.
                                    <ul>
                                        <li>For example: <code>http://192.168.1.67:8881/</code> — This would correspond to group1 user so password: group1</li>
                                        <li>Replace <code>192.168.1.67</code> with your actual DOFBOT IP address.</li>
                                        <li>As shown below:</li>
                                    </ul>
                                    <img src="images/Dofbot/Preparation/Accessing_JupyterLab_1.png" alt="Jupyter login screen" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                                </li>
                                <li>You will see the Jupyter Lab interface.</li>
                                <li>Navigate into the <strong>readonly_examples</strong> directory then enter <strong>Dofbot</strong>.</li>
                                <li>
                                    Inside, you will see several folders. Enter a folder to access the code:
                                    <img src="images/Dofbot/Preparation/Accessing_JupyterLab_2.png" alt="Folder contents" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                                </li>
                            </ol>
                        `
                    },
                    {
                        id: 'prep-running',
                        label: 'Running Code',
                        content: `
                            <h2>Running Code in JupyterLab</h2>
                            <ol>
                                <li>
                                    Click the <strong>Run</strong> button in the top menu to execute the code:
                                    <img src="images/Dofbot/Preparation/Running_Code_1.png" alt="Run button 1" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                                    <img src="images/Dofbot/Preparation/Running_Code_2.png" alt="Run button 2" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                                    <img src="images/Dofbot/Preparation/Running_Code_3.png" alt="Run button 3" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                                </li>
                                <li>
                                    To exit and run another program, click the Kernel menu and open a different file:
                                    <img src="images/images/Dofbot/Preparation/Running_Code_4.png" alt="Kernel menu" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                                </li>
                            </ol>
                        `
                    }
                ],
                content: `<h2>Preparation</h2><p>Select a subsection to get started.</p>`
            },
            {
                id: 'basic-control-course',
                label: 'Basic control course',
                                content: `<h2>Basic control course</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    {
                        id: 'bcc-rgb',
                        label: '1. Control RGB Light',
                        content: `
                            <h2>Control RGB light</h2>
                            <p>The underlying firmware of the robot arm expansion board is developed separately. We provide an interface to allow users to call it. This underlying firmware is responsible for controlling the bus servos, PWM servos, and RGB lights.</p>
                            <p>The underlying driver source code has been packaged into a python library, and the underlying driver firmware has been installed in the system image provided by Yahboom.</p>
                            <p>If you want to transplant it to your own system, you can find the <strong>Dofbot.tar.gz</strong> compressed package in the program source code summary folder, and then remotely transfer it to the Raspberry Pi system through winscp software.</p>
                            <p>Enter the following command to decompress the firmware package:</p>
                            <pre><code>tar -vxzf Dofbot.tar.gz</code></pre>
                            <p>After successful decompression, the following interface will appear:</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_RGB_Light_1.png" alt="terminal" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>Then install it into the system through the following command:</p>
                            <pre><code>cd Dofbot/0.py_install && sudo python3 setup.py install</code></pre>
                            <p>Enter the user password and press Enter to confirm. If you see the installation prompt Arm_Lib=x.x.x version number, the installation is successful.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_RGB_Light_2.png" alt="terminal install success" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <h3>1. API Introduction</h3>
                            <p>The corresponding API for RGB lights is:</p>
                            <p><code>Arm_RGB_set(R, G, B)</code> — Sets the color of the RGB light on the robotic arm.</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>R</code>: Brightness of the red light (0-255). Higher = brighter.</li>
                                <li><code>G</code>: Brightness of the green light (0-255). Higher = brighter.</li>
                                <li><code>B</code>: Brightness of the blue light (0-255). Higher = brighter.</li>
                            </ul>
                            <p><strong>Return Value:</strong> None</p>
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/1.rgb.ipynb</code></p>
                            <pre><code># Cycle through the RGB lights on the robot arm expansion board to illuminate red, green, and blue.
#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Get the object of the robotic arm
Arm = Arm_Device()
time.sleep(.1)
def main():
    while True:
        Arm.Arm_RGB_set(50, 0, 0) #RGB Red light on
        time.sleep(.5)
        Arm.Arm_RGB_set(0, 50, 0) #RGB Green light on
        time.sleep(.5)
        Arm.Arm_RGB_set(0, 0, 50) #RGB blue light on
        time.sleep(.5)
        print(" END OF LINE! ")
try :
    main()
except KeyboardInterrupt:
    # Release the Arm object
    del Arm
    print(" Program closed! ")
    pass</code></pre>
                            <p>Open the 1.rgb.ipynb file from jupyter lab, and click the "Run" entire notebook button on the jupyter lab toolbar. You can see that the RGB light on the robot arm expansion board lights up red, green, and blue lights in a cycle every 0.5 seconds.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_RGB_Light_3.png" alt="board light up in RGB" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>If you want to quit, click the Stop button on the toolbar.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_RGB_Light_4.png" alt="pause button" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'bcc-buzzer',
                        label: '2. Control Buzzer',
                        content: `
                            <h2>Control buzzer</h2>
                            <h3>1. API Introduction</h3>
                            <p><code>Arm_Buzzer_On(delay=255)</code> — Turn on the buzzer.</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>delay</code>: The input range of delay is 1~50. The larger the value, the longer the buzzer sounds. It will automatically turn off after timeout. The delay time is specified: 1=100 milliseconds, 2=200 milliseconds, and so on, up to the maximum delay time of 50=5 seconds. If delay does not pass in a value or delay=255, it means that the buzzer beeps for a long time and needs to be turned off manually.</li>
                            </ul>
                            <p><strong>Return Value:</strong> None</p>
                            <p><code>Arm_Buzzer_Off()</code> — Turn off the buzzer.</p>
                            <p><strong>Parameters:</strong> No parameters are passed in.</p>
                            <p><strong>Return Value:</strong> None</p>
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/2.beep.ipynb</code></p>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device

#Get the object of the robotic arm
Arm = Arm_Device()
time.sleep(.1)

# The buzzer automatically sounds for 100 milliseconds and then turns off.
b_time = 1
Arm.Arm_Buzzer_On(b_time)
time.sleep(1)

#The buzzer automatically sounds for 300 milliseconds and then turns off.
b_time = 3
Arm.Arm_Buzzer_On(b_time)
time.sleep(1)

# The buzzer keeps beeping
Arm.Arm_Buzzer_On()
time.sleep(1)

#Turn off the buzzer
Arm.Arm_Buzzer_Off()
time.sleep(1)

del Arm # Release Arm object</code></pre>
                            <p>Open the 2.beep.ipynb file from jupyter lab and click the Run entire notebook button on the jupyter lab toolbar. You can hear the buzzer on the expansion board beeping three times in a row, and the sound from the back is longer than the sound from the front.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_Buzzer_1.png" alt="run button" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>It will automatically exit after the operation is completed.</p>
                        `
                    },
                    {
                        id: 'bcc-servo',
                        label: '3. Control Single Servo',
                        content: `
                            <h2>Control single servo</h2>
                            <h3>1. API Introduction</h3>
                            <p>The API corresponding to controlling a single bus servo is:</p>
                            <p><code>Arm_serial_servo_write(id, angle, time)</code> — Control the angle to which the bus servo will run.</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>id</code>: The ID number of the servo to be controlled, ranging from 1 to 6. Each ID number represents a servo. The ID of the bottom servo is 1 and increases upwards. The ID of the top servo is 6.</li>
                                <li><code>Angle</code>: The angle to which the servo is to be controlled. Except for the No. 5 servo (ID=5), the control range of the other servos is 0~180, and the control range of the No. 5 servo is 0~270.</li>
                                <li><code>Time</code>: Controls the time the servo runs. Within the valid range, the servo rotates at the same angle. The smaller the input running time, the faster the servo moves. Entering 0 will cause the servo to run at the fastest speed.</li>
                            </ul>
                            <p><strong>Return Value:</strong> None</p>
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/3.ctrl_servo.ipynb</code></p>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Create a robotic arm object
Arm = Arm_Device()
time.sleep(.1)

# Individually control a servo to move to a certain angle
id = 6
Arm.Arm_serial_servo_write(id, 90, 500)
time.sleep(1)

# Control a servo to switch angles cyclically
id = 6
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

try :
    main()
except KeyboardInterrupt:
    print(" Program closed! ")
    pass

del Arm # Release Arm object</code></pre>
                            <p>Open the program file from jupyter lab and click the run entire notebook button on the jupyter lab toolbar. You can see that the claws of the robotic arm are constantly changing angles.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_Single_Servo_1.png" alt="gripper open and close" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>If you want to quit, click the Stop button on the toolbar.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_Single_Servo_2.png" alt="stop button" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'bcc-read',
                        label: '4. Read Servo Angle',
                        content: `
                            <h2>Read the current position of the servo</h2>
                            <h3>1. API Introduction</h3>
                            <p>The API corresponding to reading the angle of a single bus servo is:</p>
                            <p><code>Arm_serial_servo_read(id)</code> — Read the current angle value of the bus servo.</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>id</code>: The ID number of the servo to be read, ranging from 1 to 6. Each ID number represents a servo. The ID of the bottom servo is 1 and increases upwards. The ID of the top servo is 6.</li>
                            </ul>
                            <p><strong>Return Value:</strong> The current angle of the corresponding ID servo. When ID=5, the angle range is 0~270, and otherwise it is 0~180.</p>
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/4.ctrl_servo.ipynb</code></p>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Create robot arm object
Arm = Arm_Device()
time.sleep(.1)

# Read the angles of all servos and print them out in a loop
def main():
    while True:
        for i in range(6):
            aa = Arm.Arm_serial_servo_read(i+1)
            print(aa)
            time.sleep(.01)
        time.sleep(.5)
        print(" END OF LINE! ")
try :
    main()
except KeyboardInterrupt:
    print(" Program closed! ")
    pass

# After controlling the movement of a servo separately, read its angle.
id = 6
angle = 150
Arm.Arm_serial_servo_write(id, angle, 500)
time.sleep(1)
aa = Arm.Arm_serial_servo_read(id)
print(aa)
time.sleep(.5)

del Arm # Release Arm object</code></pre>
                            <p>Open the program file from jupyter lab and click the Run entire notebook button on the jupyter lab toolbar. Jupyter lab will print out the angle values of the six servos of the current robotic arm.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Read_Servo_Angle_1.png" alt="run with terminal" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>If you want to quit, click the Stop button on the toolbar.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Read_Servo_Angle_2.png" alt="stop button" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'bcc-all',
                        label: '5. Control All Servos',
                        content: `
                            <h2>Control all servo</h2>
                            <h3>1. API Introduction</h3>
                            <p>The API corresponding to controlling 6 bus servos at one time is:</p>
                            <p><code>Arm_serial_servo_write6(S1, S2, S3, S4, S5, S6, time)</code> — Simultaneously control the angle to which the six servos of the robotic arm are to move.</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>S1</code>: Angle value of No. 1 servo 0~180.</li>
                                <li><code>S2</code>: Angle value of No. 2 servo 0~180.</li>
                                <li><code>S3</code>: Angle value of No. 3 servo 0~180.</li>
                                <li><code>S4</code>: Angle value of No. 4 servo is 0~180.</li>
                                <li><code>S5</code>: Angle value of No. 5 servo is 0~270.</li>
                                <li><code>S6</code>: Angle value of servo No. 6 is 0~180.</li>
                                <li><code>Time</code>: Controls the time the servo runs. Within the valid range, the servo rotates at the same angle. The smaller the input running time, the faster the servo moves. Entering 0 will cause the servo to run at the fastest speed.</li>
                            </ul>
                            <p><strong>Return Value:</strong> None</p>
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/5.ctrl_all.ipynb</code></p>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Create robot arm object
Arm = Arm_Device()
time.sleep(.1)

# Control the movement of six servos at the same time and gradually change the angle.
def ctrl_all_servo(angle, s_time = 500):
    Arm.Arm_serial_servo_write6(angle, 180-angle, angle, angle, angle, angle, s_time)
    time.sleep(s_time/1000)

def main():
    dir_state = 1
    angle = 90
    # Reset the servo to center
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

try :
    main()
except KeyboardInterrupt:
    print(" Program closed! ")
    pass

del Arm # Release Arm object</code></pre>
                            <p>Open the program file from jupyter lab and click the Run entire notebook button on the jupyter lab toolbar. You can see that the six servos of the robotic arm rotate at the same time and the robotic arm continuously changes its posture.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_All_Servo_1.png" alt="run button" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>If you want to quit, click the Stop button on the toolbar.</p>
                            <img src="images/Dofbot/Basic_Control_Course/Control_All_Servo_2.png" alt="stop button" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'bcc-grab',
                        label: '6. DOFBOT Grab Block',
                        content: `
                            <h2>DOFBOT grab block</h2>
                            <h3>1. Game introduction</h3>
                            <p>The purpose of this experiment is to move the blocks from the gray area in the middle to the surrounding square areas of different colors. First put the yellow block into the gray area, and then run the code unit to the sixth unit in sequence (grab a building block from the gray building block and place it on the yellow building block). At this time, the robot arm will automatically grab the block placed in the gray area, then place it in the yellow area, and then return to the ready position. Before running the seventh code unit, you need to place the red block in the gray area, and then run the seventh unit (grab a building block from the gray building block and place it on the red building block). In this way, red squares will also be captured to the red area, and other squares will be operated in the same way.</p>
                            <img src="images/Dofbot/Basic_Control_Course/DOFBOT_Grab_Block_1.png" alt="Block arrangement" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/9.clamp_block.ipynb</code></p>
                            <div class="doc-note warning"><strong>The following code content needs to be executed according to the actual step, and cannot be run all at once. Before picking up the building blocks, you need to place the building blocks on the gray building blocks in the middle, and only one block can be placed at a time.</strong></div>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Create robot arm object
Arm = Arm_Device()
time.sleep(.1)

# Define the function of clamping building blocks, enable=1:clamp, =0:release
def arm_clamp_block(enable):
    if enable == 0:
        Arm.Arm_serial_servo_write(6, 60, 400)
    else:
        Arm.Arm_serial_servo_write(6, 130, 400)
        time.sleep(.5)

# Define the mobile robot arm function and control the movement of servos No. 1-5 at the same time, p=[S1,S2,S3,S4,S5]
def arm_move(p, s_time = 500):
    for i in range(5):
        id = i + 1
        if id == 5:
            time.sleep(.1)
            Arm.Arm_serial_servo_write(id, p[i], int(s_time*1.2))
        else:
            Arm.Arm_serial_servo_write(id, p[i], s_time)
        time.sleep(.01)
    time.sleep(s_time/1000)

# Robotic arm moves up
def arm_move_up():
    Arm.Arm_serial_servo_write(2, 90, 1500)
    Arm.Arm_serial_servo_write(3, 90, 1500)
    Arm.Arm_serial_servo_write(4, 90, 1500)
    time.sleep(.1)

# Define variable parameters at different locations
p_mould  = [90, 130,  0,  0,  90]
p_top    = [90,  80, 50, 50, 270]
p_Brown  = [90,  53, 33, 36, 270]
p_Yellow = [65,  22, 64, 56, 270]
p_Red    = [117, 19, 66, 56, 270]
p_Green  = [136, 66, 20, 29, 270]
p_Blue   = [44,  66, 20, 28, 270]

# Let the robotic arm move to a position ready to grab
arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Grab a building block from the gray building block and place it on the yellow building block.
arm_move(p_top, 1000)
arm_move(p_Brown, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Yellow, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Grab a building block from the gray building block and place it on the red building block.
arm_move(p_top, 1000)
arm_move(p_Brown, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Red, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)
time.sleep(1)

# Grab a building block from the gray building block and place it on the green building block.
arm_move(p_top, 1000)
arm_move(p_Brown, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Green, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)
time.sleep(1)

# Grab a building block from the gray building block and place it on the blue building block.
arm_move(p_top, 1000)
arm_move(p_Brown, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Blue, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)
time.sleep(1)

del Arm # Release Arm object</code></pre>
                        `
                    },
                    {
                        id: 'bcc-porter',
                        label: '7. Porter',
                        content: `
                            <h2>Porter</h2>
                            <h3>1. Introduction to gameplay</h3>
                            <p><strong>The purpose of this experiment is to stack four building blocks of different colors from bottom to top in the order of blue, green, red and yellow, place them on the middle gray square, and then run the code.</strong></p>
                            <p>The robot arm will pick up the fourth layer of blocks and place them in the yellow area, pick up the third layer blocks and place them in the red area, pick up the second layer blocks and put them in the green area, and pick up the bottom blocks and place them in the blue area, Execute in order. The way to place the building blocks is as shown in the figure below:</p>
                            <img src="images/Dofbot/Basic_Control_Course/Porter_1.png" alt="Block stacking order" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>After executing the code, the robot arm will carry the building blocks to the corresponding position. The final effect is as shown in the figure below:</p>
                            <img src="images/Dofbot/Basic_Control_Course/Porter_2.png" alt="Block spread result" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/10.move_block.ipynb</code></p>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Create robot arm object
Arm = Arm_Device()
time.sleep(.1)

def arm_clamp_block(enable):
    if enable == 0:
        Arm.Arm_serial_servo_write(6, 60, 400)
    else:
        Arm.Arm_serial_servo_write(6, 130, 400)
        time.sleep(.5)

def arm_move(p, s_time = 500):
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

p_mould   = [90, 130,  0,  0,  90]
p_top     = [90,  80, 50, 50, 270]
p_Yellow  = [65,  22, 64, 56, 270]
p_Red     = [117, 19, 66, 56, 270]
p_Green   = [136, 66, 20, 29, 270]
p_Blue    = [44,  66, 20, 28, 270]
p_layer_4 = [90,  72, 49, 13, 270]
p_layer_3 = [90,  66, 43, 20, 270]
p_layer_2 = [90,  63, 34, 30, 270]
p_layer_1 = [90,  53, 33, 36, 270]

arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Move the building blocks on the fourth floor to the yellow area
arm_move(p_top, 1000)
arm_move(p_layer_4, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Yellow, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)

# Move the third layer of building blocks to the red area
arm_move(p_top, 1000)
arm_move(p_layer_3, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Red, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)

# Carry the second layer of building blocks to the green area
arm_move(p_top, 1000)
arm_move(p_layer_2, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Green, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)

# Move the first layer of building blocks to the blue area
arm_move(p_top, 1000)
arm_move(p_layer_1, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_Blue, 1000)
arm_clamp_block(0)
arm_move_up()
arm_move(p_mould, 1100)

del Arm #Release Arm object</code></pre>
                        `
                    },
                    {
                        id: 'bcc-stacked',
                        label: '8. Stacked Arhat',
                        content: `
                            <h2>Stacked Arhat</h2>
                            <h3>1. Introduction to gameplay</h3>
                            <p>The purpose of this experiment is exactly the opposite of the previous lesson "Nature Porter". It is to pick up the building blocks from different sides in the order of yellow, red, green and blue and stack them into the gray area in the middle.</p>
                            <p>The way to place the building blocks is as shown in the figure below:</p>
                            <img src="images/Dofbot/Basic_Control_Course/Stacked_Arhat_1.png" alt="Block spread starting position" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>After executing the code, the robotic arm will stack the building blocks, and the final effect is as shown in the figure below:</p>
                            <img src="images/Dofbot/Basic_Control_Course/Stacked_Arhat_2.png" alt="Block stacked result" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <h3>2. Code content</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/3.ctrl_Arm/11.heap_up.ipynb</code></p>
                            <pre><code>#!/usr/bin/env python3
#coding=utf-8
import time
from Arm_Lib import Arm_Device
# Create robot arm object
Arm = Arm_Device()
time.sleep(.1)

def arm_clamp_block(enable):
    if enable == 0:
        Arm.Arm_serial_servo_write(6, 60, 400)
    else:
        Arm.Arm_serial_servo_write(6, 130, 400)
        time.sleep(.5)

def arm_move(p, s_time = 500):
    for i in range(5):
        id = i + 1
        if id == 5:
            time.sleep(.1)
            Arm.Arm_serial_servo_write(id, p[i], int(s_time*1.2))
        elif id == 1:
            Arm.Arm_serial_servo_write(id, p[i], int(3*s_time/4))
        else:
            Arm.Arm_serial_servo_write(id, p[i], int(s_time))
        time.sleep(.01)
    time.sleep(s_time/1000)

p_mould   = [90, 130,  0,  0,  90]
p_top     = [90,  80, 50, 50, 270]
p_layer_4 = [90,  76, 40, 17, 270]
p_layer_3 = [90,  65, 44, 17, 270]
p_layer_2 = [90,  65, 25, 36, 270]
p_layer_1 = [90,  48, 35, 30, 270]
p_Yellow  = [65,  22, 64, 56, 270]
p_Red     = [118, 19, 66, 56, 270]
p_Green   = [136, 66, 20, 29, 270]
p_Blue    = [44,  66, 20, 28, 270]

arm_clamp_block(0)
arm_move(p_mould, 1000)
time.sleep(1)

# Stack the blocks in the yellow area to the bottom position in the middle.
arm_move(p_top, 1000)
arm_move(p_Yellow, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_layer_1, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1100)

# Stack the blocks in the red area to the second layer in the middle.
arm_move(p_top, 1000)
arm_move(p_Red, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_layer_2, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1100)

# Stack the blocks in the green area to the third layer in the middle.
arm_move(p_top, 1000)
arm_move(p_Green, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_layer_3, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1100)

# Stack the blocks in the blue area to the fourth layer in the middle.
arm_move(p_top, 1000)
arm_move(p_Blue, 1000)
arm_clamp_block(1)
arm_move(p_top, 1000)
arm_move(p_layer_4, 1000)
arm_clamp_block(0)
arm_move(p_mould, 1100)

del Arm # Release Arm object</code></pre>
                        `
                    },
                    {
                        id: 'bcc-camera',
                        label: '9. USB Camera Display',
                        content: `
                            <h2>USB camera display</h2>
                            <h3>1. Camera reading</h3>
                            <p><code>capture = cv.VideoCapture(0)</code></p>
                            <p><strong>Parameters:</strong> The parameter in VideoCapture() is 0, which means opening the laptop's built-in camera. If the parameter is the video file path, the video will be opened, such as <code>cap = cv2.VideoCapture("../test.avi")</code>.</p>
                            <h3>2. Display camera video</h3>
                            <p><code>ret, img = frame.read()</code></p>
                            <p><strong>Return Value:</strong></p>
                            <ul>
                                <li><code>ret</code>: ret is a bool value to determine whether the correct frame is read back.</li>
                                <li><code>img</code>: image data of each frame.</li>
                            </ul>
                            <h3>3. Code and actual effect display</h3>
                            <p>Program path: <code>/home/jetson/Dofbot/5.AI_Visual/0.Camera Driver Tutorial.ipynb</code></p>
                            <pre><code>import cv2
import ipywidgets.widgets as widgets
import threading
import time

image_widget = widgets.Image(format='jpeg', width=600, height=500)  #Set up the camera display component
display(image_widget)                                               #Show camera components

def bgr8_to_jpeg(value, quality=75):
    return bytes(cv2.imencode('.jpg', value)[1])

image = cv2.VideoCapture(0, cv2.CAP_V4L2)       #open camera
ret, frame = image.read()
image_widget.value = bgr8_to_jpeg(frame)</code></pre>
                            <p>After the code block is run, the picture captured by the USB camera can be displayed.</p>
                            <img src="images/03_09_01_camera.png" alt="camera showing a keyboard with a student's hand" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    }
                ],
                content: `<h2>Basic Control Course</h2><p>Select a subsection to get started.</p>`
            },
            {
                id: 'opencv-course',
                label: 'OpenCV course',
                                content: `<h2>OpenCV course</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    {
                        id: 'ocv-intro',
                        label: '1. Introduction to Open Source CV',
                        content: `
                            <h2>Introduction to Open Source CV</h2>
                            <img src="images/04_01_01_opencvlogo.png" alt="OpenCV logo" style="max-width:200px;border-radius:.5rem;margin:.75rem 0;">
                            <p>What is OpenCV? Its full name is Open source Computer Vision Library, open source computer vision library. As shown in the picture above, what we see is the OpenCV logo. We can see that it consists of three small rings in the three distinct primary colors of R, G, and B. In other words, it is a set of open source API function libraries about computer vision. This also means:</p>
                            <ol>
                                <li>Whether it is scientific research or commercial application, it can be used for development.</li>
                                <li>The source code of all API functions is public, and you can see the program steps of its internal implementation.</li>
                                <li>You can modify the source code of OpenCV and compile and generate the specific API functions you need.</li>
                            </ol>
                            <p>Image processing on ROSMASTER uses certain functions of the OpenCV function library, or it can be said that it is inseparable from its existence in most image processing design fields. As early as many years ago, OpenCV has been showing its talents in the fields of intrusion detection, specific target tracking, target detection, face detection, face recognition, face tracking, etc., and these are just the tip of the iceberg of its applications. Since we realize that OpenCV is so versatile, in this chapter we will introduce you to some very basic image processing functions that we use in our courses, as well as some universal functions. Here we first have a general understanding of this knowledge, and then there are two practical projects on color recognition and tracking, and face recognition and tracking to teach you how to get started. However, the powerful application functions provided by OpenCV are far more than this. If you are interested in OpenCV computer vision library development and want to learn more about it, here are several websites for your reference and study:</p>
                            <ul>
                                <li>OpenCV Official homepage: <a href="https://www.opencv.org/" target="_blank">https://www.opencv.org/</a></li>
                                <li>OpenCV Chinese forum: <a href="http://www.opencv.org.cn/" target="_blank">http://www.opencv.org.cn/</a></li>
                                <li>OpenCV CSDN forum: <a href="https://bbs.csdn.net/forums/OpenCV" target="_blank">https://bbs.csdn.net/forums/OpenCV</a></li>
                            </ul>
                        `
                    },
                    {
                        id: 'ocv-read',
                        label: '2. Image Reading and Display',
                        content: `
                            <h2>Image reading and display</h2>
                            <h3>1. Reading of images</h3>
                            <p><code>img = cv2.imread('yahboom.jpg', 0)</code></p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>'yahboom.jpg'</code>: The first parameter is the path of the image.</li>
                                <li><code>0</code>: The second parameter is how to read the image.</li>
                                <li><code>cv2.IMREAD_UNCHANGED</code>: Keep the original format unchanged, -1.</li>
                                <li><code>cv2.IMREAD_GRAYSCALE</code>: Read the image in grayscale mode, which can be represented by 0.</li>
                                <li><code>cv2.IMREAD_COLOR</code>: Read a color picture, which can be represented by 1; default value.</li>
                                <li><code>cv2.IMREAD_UNCHANGED</code>: Read in an image and include its alpha channel, which can be represented by 2.</li>
                            </ul>
                            <h3>2. Image display</h3>
                            <p><code>cv.imshow('frame', frame)</code> — Open a window named frame and display frame data (image/video data).</p>
                            <p><strong>Parameters:</strong></p>
                            <ul>
                                <li><code>'frame'</code>: The first parameter represents the name of the window that is created and opened.</li>
                                <li><code>frame</code>: The second parameter represents the image to be displayed.</li>
                            </ul>
                            <h3>2.1 Code and actual effect display</h3>
                            <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/1.OpenCV_Getting_started/01_OpenCV_image_read_display.ipynb</code></p>
                            <pre><code>import cv2
img = cv2.imread('yahboom.jpg', 1)

def bgr8_to_jpeg(value, quality=75):
    return bytes(cv2.imencode('.jpg', value)[1])

import ipywidgets.widgets as widgets
image_widget = widgets.Image(format='jpg', width=800, height=800)
display(image_widget)
image_widget.value = bgr8_to_jpeg(img)</code></pre>
                            <p>After running the code block, you can see the following interface, and the image has been read out.</p>
                            <img src="images/Dofbot/OpenCV/Image_Reading_1.png" alt="multiple bots image display" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'ocv-grayscale',
                        label: '3. Grayscale Processing',
                        content: `
                            <h2>Grayscale processing</h2>
                            <p>The process of converting a color image into a grayscale image is the grayscale processing of the image. The color of each pixel in a color image is determined by three components: R, G, and B. Each component can take a value of 0-255, so that one pixel can have a color range of more than 16 million (256×256×256=16,777,216). A grayscale image is a special color image with the same three components of R, G, and B. The range of changes of one pixel is 256. Therefore, in digital image processing, images in various formats are generally converted into grayscale images to make subsequent images less computationally intensive.</p>
                            <p><strong>Image grayscale processing:</strong> Grayscale processing is the process of converting a color image into a grayscale image. The color image is divided into three components: R, G, and B, which display various colors such as red, green, and blue respectively. Grayscale is the process of making the color R, G, and B components equal. Pixels with large grayscale values are brighter (the maximum pixel value is 255, which is white), and vice versa (the lowest pixel is 0, which is black).</p>
                            <p><strong>The core idea of image grayscale is R = G = B. This value is also called grayscale value.</strong></p>
                            <p>Image grayscale algorithms:</p>
                            <ol>
                                <li><strong>Maximum value method:</strong> Make the converted values of R, G, and B equal to the largest of the three values before conversion, that is: R=G=B=max(R, G, B). The grayscale image converted by this method is very bright.</li>
                                <li><strong>Average method:</strong> The values of R, G, and B after conversion are the average values of R, G, and B before conversion. That is: R=G=B=(R+G+B)/3. This method produces softer grayscale images.</li>
                                <li><strong>Weighted average method:</strong> According to a certain weight, the values of R, G, and B are weighted and averaged. Since the human eye is most sensitive to green, followed by red, and least sensitive to blue, a grayscale image that is easier to identify will be obtained. Generally, the grayscale image obtained is the best.</li>
                            </ol>
                            <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/3.IP_Draw_text_line_segments/01_Grayscale_processing.ipynb</code></p>
                            <pre><code>#Method 1 imread
import cv2
import matplotlib.pyplot as plt
img0 = cv2.imread('yahboom.jpg', 0)
img_bgr2rgb0 = cv2.cvtColor(img0, cv2.COLOR_BGR2RGB)
plt.imshow(img_bgr2rgb0)
plt.show()</code></pre>
                            <img src="images/Dofbot/OpenCV/GrayScale_Processing.png" alt="grayscale method 1" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <pre><code>#Method 2 cvtColor
import cv2
import matplotlib.pyplot as plt
img = cv2.imread('image0.jpg', 1)
dst = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
img_bgr2rgb0 = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
plt.imshow(img_bgr2rgb0)
plt.show()</code></pre>
                            <img src="images/Dofbot/OpenCV/GrayScale_Processing_2.png" alt="grayscale method 2" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <pre><code>#Method 3 Average method
import cv2
import numpy as np
import matplotlib.pyplot as plt
img = cv2.imread('yahboom.jpg', 1)
imgInfo = img.shape
height = imgInfo[0]
width = imgInfo[1]
dst = np.zeros((height, width, 3), np.uint8)
for i in range(0, height):
    for j in range(0, width):
        (b, g, r) = img[i, j]
        gray = (int(b)+int(g)+int(r))/3
        dst[i, j] = np.uint8(gray)
img_bgr2rgb0 = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
plt.imshow(img_bgr2rgb0)
plt.show()</code></pre>
                            <img src="images/Dofbot/OpenCV/GrayScale_Processing_3.png" alt="grayscale method 3" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <pre><code>#Method 4 Weighted average method
# gray = r*0.299+g*0.587+b*0.114
import cv2
import numpy as np
img = cv2.imread('yahboom.jpg', 1)
imgInfo = img.shape
height = imgInfo[0]
width = imgInfo[1]
dst = np.zeros((height, width, 3), np.uint8)
for i in range(0, height):
    for j in range(0, width):
        (b, g, r) = img[i, j]
        gray = int(r)*0.299+int(g)*0.587+int(b)*0.114
        dst[i, j] = np.uint8(gray)
img_bgr2rgb0 = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
plt.imshow(img_bgr2rgb0)
plt.show()</code></pre>
                            <img src="images/Dofbot/OpenCV/GrayScale_Processing_4.png" alt="grayscale method 4" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'ocv-binary',
                        label: '4. Binary Image',
                        content: `
                            <h2>Binary image</h2>
                            <p>The core idea of binarization is to set a threshold, and the value greater than the threshold is 0 (black) or 255 (white), making the image called a black and white image. The threshold can be fixed or adaptive.</p>
                            <p>Global threshold is provided in Python-OpenCV: <code>cv2.threshold(src, threshold, maxValue, method)</code></p>
                            <img src="images/Dofbot/OpenCV/Binary_Image_1.png" alt="threshold graph" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <img src="images/Dofbot/OpenCV/Binary_Image_2.png" alt="THRESH_BINARY graph" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p><code>cv2.THRESH_BINARY</code>: The gray value of pixels greater than the threshold is set to maxValue, and the gray value of pixels whose gray value is less than the threshold is set to 0.</p>
                            <img src="images/Dofbot/OpenCV/Binary_Image_3.png" alt="THRESH_BINARY_INV graph" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p><code>cv2.THRESH_BINARY_INV</code>: The gray value of pixels greater than the threshold is set to 0, while the gray value of pixels less than the threshold is set to maxValue.</p>
                            <img src="images/Dofbot/OpenCV/Binary_Image_4.png" alt="THRESH_TRUNC graph" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p><code>cv2.THRESH_TRUNC</code>: The gray value of the pixel is less than the threshold and does not change. The pixel with a gray value greater than the threshold is set to the threshold.</p>
                            <img src="images/Dofbot/OpenCV/Binary_Image_5.png" alt="THRESH_TOZERO graph" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p><code>cv2.THRESH_TOZERO</code>: Pixels whose grayscale values are smaller than the threshold do not undergo any change, while pixels whose grayscale values are larger than the threshold are all changed to 0.</p>
                            <img src="images/Dofbot/OpenCV/Binary_Image_6.png" alt="THRESH_TOZERO_INV graph" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p><code>cv2.THRESH_TOZERO_INV</code>: If the gray value of the pixel is greater than the threshold, no change will be made. If the gray value of the pixel is less than the threshold, all the gray values will be changed to 0.</p>
                            <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/3.IP_Draw_text_line_segments/02Image_Binarization.ipynb</code></p>
                            <pre><code>import cv2
import numpy as np
import matplotlib.pyplot as plt
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
                            <img src="images/Dofbot/OpenCV/Binary_Image_7.png" alt="six threshold results" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    },
                    {
                        id: 'ocv-canny',
                        label: '5. Edge Detection (Canny)',
                        content: `
                            <h2>Edge detection</h2>
                            <p>The purpose of edge detection is to significantly reduce the data size of the image while retaining the original image attributes. There are currently many algorithms for edge detection. Although the Canny algorithm is old, it can be said that it is a standard algorithm for edge detection and is still widely used in research. Canny edge detection is a technology that extracts useful structural information from different visual objects and greatly reduces the amount of data to be processed.</p>
                            <p>General standards for edge detection include: detecting edges with a low error rate means capturing as many edges as possible in the image as accurately as possible. The detected edge should be located exactly at the center of the real edge. A given edge in the image should be marked only once, and where possible, noise in the image should not produce false edges.</p>
                            <p>The Canny edge detection algorithm can be divided into the following 5 steps:</p>
                            <ol>
                                <li>Use Gaussian filter to smooth the image and filter out noise.</li>
                                <li>Calculate the gradient intensity and direction of each pixel in the image.</li>
                                <li>Apply non-maximum suppression to eliminate spurious responses caused by edge detection.</li>
                                <li>Apply Double-Threshold detection to determine real and potential edges.</li>
                                <li>Finally complete edge detection by suppressing isolated weak edges.</li>
                            </ol>
                            <p>Code path: <code>/home/jetson/Dofbot/4.opencv_EN/3.IP_Draw_text_line_segments/03_1edge_detection1.ipynb</code></p>
                            <pre><code>#Method 1
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image0.jpg', 1)
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgG = cv2.GaussianBlur(gray, (3,3), 0)
dst = cv2.Canny(img, 50, 50)

img_bgr2rgb1 = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
plt.imshow(img_bgr2rgb1)
plt.show()

img_bgr2rgb1 = cv2.cvtColor(dst, cv2.COLOR_BGR2RGB)
plt.imshow(img_bgr2rgb1)
plt.show()</code></pre>
                            <img src="images/Dofbot/OpenCV/Edge_Detection_1.png" alt="Canny edge detection comparison" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>Code path: <code>/home/dofbot/Dofbot/4.opencv/3.draw_picture/03_Edge_detection_2.ipynb</code></p>
                            <pre><code>#Method 2
import cv2
import numpy as np
import math
img = cv2.imread('image0.jpg', 1)
imgInfo = img.shape
height = imgInfo[0]
width = imgInfo[1]
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
dst = np.zeros((height, width, 1), np.uint8)
for i in range(0, height-2):
    for j in range(0, width-2):
        gy = gray[i,j]*1+gray[i,j+1]*2+gray[i,j+2]*1-gray[i+2,j]*1-gray[i+2,j+1]*2-gray[i+2,j+2]*1
        gx = gray[i,j]+gray[i+1,j]*2+gray[i+2,j]-gray[i,j+2]-gray[i+1,j+2]*2-gray[i+2,j+2]
        grad = math.sqrt(gx*gx+gy*gy)
        if grad > 50:
            dst[i,j] = 255
        else:
            dst[i,j] = 0</code></pre>
                            <img src="images/Dofbot/OpenCV/Edge_Detection_2.png" alt="Sobel edge detection result" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                        `
                    }
                ],
                content: `<h2>OpenCV Course</h2><p>Select a subsection to get started.</p>`
            },
            {
                id: 'app',
                label: 'App',
                                content: `<h2>App</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    {
                        id: 'app-on',
                        label: 'Turn On App Control',
                        content: `
                            <h2>App Control for Dofbot</h2>
                            <h3>Turn on app control:</h3>
                            <pre><code>python3 ~/Desktop/Arm/YahboomArm.pyc</code></pre>
                        `
                    },
                    {
                        id: 'app-off',
                        label: 'Turn Off App Control',
                        content: `
                            <h2>Turn off app control</h2>
                            <h3>Turn off app control (in a new terminal):</h3>
                            <pre><code>bash ~/Desktop/readonly_examples/Dofbot/kill_YahboomArm.sh</code></pre>
                        `
                    },
                    {
                        id: 'app-remote',
                        label: 'Remote Control Interface',
                        content: `
                            <h2>APP control</h2>
                            <h3>Remote Control</h3>
                            <p>Click the <strong>[Remote Control]</strong> icon, the following interface will appear on APP.</p>
                            <img src="images/Dofbot/App/Remote_Control_Interface_1.png" alt="Remote control interface" style="max-width:100%;border-radius:.5rem;margin:.75rem 0;">
                            <p>The camera screen is displayed on the left side of the APP. The numbers 1 to 6 on the schematic diagram of the DOFBOT represent the six servos. When we select the servo with the current ID number, the corresponding number will become red. Then, we can adjust the angle of the servo by dragging the slider or pressing left and right buttons.</p>
                            <ul>
                                <li><strong>[Angle]</strong>: After clicking this button, the APP will read the current servo angle, and update angle value to the upper slider.</li>
                                <li><strong>[Middle]</strong>: DOFBOT returns to initial state.</li>
                                <li><strong>[Stop]</strong>: Click this button, torque of the DOFBOT will be closed and stop receive control commands. We can manually control the angle of the servo. Click this button again, torque of the DOFBOT will be opened, it will returns to initial state. And it starts receive control commands.</li>
                            </ul>
                        `
                    }
                ],
                content: `<h2>App Control</h2><p>Select a subsection to get started.</p>`
            },
            {
                id: 'professor-notes',
                label: 'Professor Notes',
                internal: true,
                children: [
                    {
                        id: 'pn-hardware',
                        label: 'Known Hardware Issues',
                        internal: true,
                        content: `
                            <h2>Known Hardware Issues</h2>
                            <ul>
                                <li>Unit #3 has a loose connector on joint 4 — avoid assigning to groups doing precision tasks.</li>
                                <li>Unit #7 servo gripper runs warm after ~20 min of continuous use. Rotate groups using this unit.</li>
                                <li>The Duckietown WiFi router resets occasionally — password may temporarily revert to default <code>duckietown</code>.</li>
                            </ul>
                        `
                    },
                    {
                        id: 'pn-grading',
                        label: 'Grading Notes',
                        internal: true,
                        content: `
                            <h2>Grading Notes</h2>
                            <ul>
                                <li>Lab 2 rubric updated March 2026 — see shared drive for the revised PDF.</li>
                                <li>Extra credit available for groups that implement a full pick-and-place with visual servoing.</li>
                            </ul>
                        `
                    },
                    {
                        id: 'pn-emergency',
                        label: 'Emergency Procedures',
                        internal: true,
                        content: `
                            <h2>Emergency Procedures</h2>
                            <ul>
                                <li>Emergency stop: pull the power cable from the expansion board directly.</li>
                                <li>If a joint is jammed, do NOT force it. Power off and notify the lab manager (ext. 4402).</li>
                            </ul>
                        `
                    },
                    {
                        id: 'pn-credentials',
                        label: 'Access Credentials',
                        internal: true,
                        content: `
                            <h2>Student Access Credentials</h2>
                            <div class="doc-note warning"><strong>DO NOT SHARE with students.</strong></div>
                            <ul>
                                <li>Admin Jetson account: <code>jetson</code> / <code>yahboom</code></li>
                                <li>Lab server SSH: <code>ssh labadmin@192.168.1.100</code> — key on the lab laptop.</li>
                            </ul>
                        `
                    }
                ],
                content: `
                    <h2>Professor Notes — Internal</h2>
                    <div class="doc-note warning"><strong>This section is only visible to logged-in professors.</strong></div>
                    <p>Select a subsection below.</p>
                `
            }
        ]
    },
    {
        id: 'rosmaster',
        name: 'ROSMASTER X3',
        description: 'The Rosmaster X3 is an advanced mobile robot with ROS (Robot Operating System). This repository contains setup instructions, control code, and sensor integration examples for using the Rosmaster X3 with various programming environments. Students can learn SLAM (Simultaneous Localization and Mapping), exploring autonomous navigation, and working with sensors like LIDAR and cameras.',
        image: 'images/index/rosmaster.jpg',
        difficulty: 'Intro to Robot Programming',
        tags: ['ROS2 Foxy', 'NVIDIA Jetson Nano', 'LIDAR', "RGB-D Camera"],
        sections: [
            {
                id: 'overview',
                label: 'Overview',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'getting-started',
                label: 'Getting Started',
                                content: `<h2>Getting Started</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    { id: 'rm-gs-power',    label: 'Powering On',         content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-gs-wifi',     label: 'WiFi & SSH Setup',    content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-gs-ros',      label: 'ROS2 Environment',    content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-gs-bringup',  label: 'Robot Bringup',       content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` }
                ],
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'motor-control',
                label: 'Motor Control',
                                content: `<h2>Motor Control</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    { id: 'rm-mc-basics',   label: 'Basic Movement',      content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-mc-speed',    label: 'Speed Control',       content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-mc-encoder',  label: 'Encoder Feedback',    content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` }
                ],
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'lidar',
                label: 'LIDAR Setup',
                                content: `<h2>LIDAR Setup</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    { id: 'rm-lidar-install', label: 'Installation',      content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-lidar-launch',  label: 'Launching LIDAR',   content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-lidar-rviz',    label: 'Visualizing in RViz',content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` }
                ],
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'navigation',
                label: 'Navigation & SLAM',
                                content: `<h2>Navigation & SLAM</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    { id: 'rm-nav-mapping',  label: 'Building a Map',     content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-nav-localize', label: 'Localization',       content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'rm-nav-autonomy', label: 'Autonomous Nav',     content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` }
                ],
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'professor-notes',
                label: 'Professor Notes',
                internal: true,
                children: [
                    {
                        id: 'rm-pn-checklist',
                        label: 'Setup Checklist',
                        internal: true,
                        content: `
                            <h2>Setup Checklist (Pre-Lab)</h2>
                            <ul>
                                <li>Verify ROS2 Foxy is sourced on all Jetson units: <code>source /opt/ros/foxy/setup.bash</code></li>
                                <li>Ensure LIDAR units are fully charged before class — charge overnight.</li>
                                <li>Check that the <code>rosmaster_bringup</code> package is present on each robot.</li>
                            </ul>
                        `
                    },
                    {
                        id: 'rm-pn-issues',
                        label: 'Known Issues',
                        internal: true,
                        content: `
                            <h2>Known Issues</h2>
                            <ul>
                                <li>Unit #2 has intermittent WiFi dropout — keep it tethered via USB-C during demos.</li>
                                <li>SLAM mapping crashes if students run <code>ros2 bag record -a</code> simultaneously — advise against it.</li>
                            </ul>
                        `
                    }
                ],
                content: `
                    <h2>Professor Notes — Internal</h2>
                    <div class="doc-note warning"><strong>This section is only visible to logged-in professors.</strong></div>
                    <p>Select a subsection below.</p>
                `
            }
        ]
    },
    {
        id: 'raspbot',
        name: 'Raspbot V2',
        description: 'The Raspbot V2 is a beginner-friendly robot car that runs on the Raspberry Pi. This repository includes code and documentation for setting up the Raspbot, controlling its movement, and incorporating basic computer vision features. This repo teaches students motor control, obstacle avoidance, and basic computer vision using Python.',
        image: 'images/index/raspbot.jpg',
        difficulty: 'Robotics 2',
        tags: ['Raspberry Pi 5', 'ROS2 Humble', 'Ultrasonic', 'Articulated Camera'],
        sections: [
            {
                id: 'important-notes',
                label: 'Important Notes',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'overview',
                label: 'Overview',
                content: `
                <h1> Overview </h1>
                <div class="doc-note warning">
                    <strong>Please read carefully before operating the robot.</strong>
                </div>
                <h2> Introduction </h2>
                <p>Raspbot V2 is a good introduction into robotics. It has simple and easy to learn features and commands but that also allows for a lot of creativity on your part to make it do what you want. Remember, this is a beginner course so everthing will be introduced to you under the presumption that you have little to no experience, and will start easy to build your knowledge. </p>
                <h2> Important Notes before Operation </h2>
                <ul>
                <li> The robot will drive into walls/people/other objects if you let it. </li>
                <li> Be careful where you set the robot to run as to not let it drive under people, out of doors, etc. </li>
                <li> Be careful with the wires, circut boards, camera, and ports when handling the robots. </li>
                <li> When you start testing your own code, do so with your robot elevated <strong>(wheels not touching the ground)</strong>, so the robot doesn't drive around randomly. </li>
                <li> Make sure the camera is plugged in <strong>before</strong> turning on the robot so it'll work properly. Also make sure to unplug the camera <strong>before</strong> you put it away for storage.</li>
                <li> Make sure camera servos are aligned on startup (Call TA or Professor if you are unsure). </li>
                </ul>

                <h2> Key Features </h2>
                <p> As mentioned before, the Raspbot V2 is a beginner friendly robot, but it does still boast an impressive amount of features, such as: </p>
                <ul>
                <li> Omnidirectional drive via the wheel treads and independent motor functions. </li>
                <li> A buzzer that can be called and controlled in scripts. </li>
                <li> Camera reading capabilities, including light and color detection, video and photos, and script implementation. </li>
                <li> Infared detection/vision with capabilities to use a remote control.  </li>
                <li> Ultrasonic detection to measure the distance from an object.</li>
                </ul>

                <h2> Physical Features </h2>
                <p> Here are some important physical and hardware on the Raspbot V2 and where they are located:
                <div> Camera (with camera cap) </div>
                <ul>
                <li> Located on the front head of the robot. Camera cap should be covering the camera, make sure to not lose it and inform a TA or professor if your camera cap is missing. </li>
                <li> Has two servos to rotate horizontally and vertically. </li>
                <li> Camera USB wire runs from the camera towards the back USB ports of the robot (make sure the camera is plugged in). </li>
                <li> Make sure the camera USB is plugged in <strong>before</strong> turning the robot on and unplugged <strong>after</strong> the robot is turned off to store</li>
                </ul>
                <div> Robot O-Led </div>
                <ul>
                <li> Located on the right side (facing) of the robot. </li>
                <li> Displays robot/raspberry pi info, such as Robot Address, CPU Usage, Memory, etc. </li>
                </ul>
                <div> Wheels and Treads </div>
                <ul>
                <li> Located on the four corners of the robot. </li>
                <li> Can be used to move forwards, backwards, left and right, as well as turning in place. </li>
                <li> Notice both the wheels and treads and how they contribute to the movement of the robot </li>
                </ul>
                <div> Power Switch </div>
                <ul>
                <li> Located on the back, under the USB ports </li>
                <li> Turns on the robot, you will know it is active by the robot beeping 3 times. <strong>(May take some time to boot up)</strong> </li>
                </ul>
                <div> Circut Boards, Wires, Ports </div>
                <ul>
                <li> Circut Boards located at the center of the bot, USB ports located at the back above the power switch. </li>
                <li> <strong>Be Careful</strong> to not mess with the circut boards too much, if at all. </li>
                <li> These are delicate systems crucial to the function of the robot. </li>
                <li> Touching the wires located by the camera is known to crash the camera on occasion. Please note this and be careful of this when using the camera. </li>
                <li> The Raspbot V2 runs on a Raspberry Pi 5. </li>
                </ul>

                <h2> Software </h2>
                <p> Here will list most of the software you will use while using this robot: </p>
                <div> Python (via JupyterLab) </div>
                <ul>
                <li> You will be using JupyterLab to write and run Python script for your robot. </li>
                <li> This will allow you to do things from simply moving your bot to making it able to navigate full obstacle courses and more. </li>
                <li> Python is one of the most beginner friendly coding languages, so don't be intimidated with coding, it starts very easy. </li>
                <li> You will be given starter code snippits and segments if you look throughout the <strong>Basic Examples</strong> and <strong>Advance Samples</strong> tabs so use those to your advantage. </li>
                <li> There is also pre-existing code already on your robot you can access in JupyterLab </li>
                </ul>
                <div> ROS2 </div>
                <ul>
                <li> Robot Operating System 2. </li>
                <li> Used for real time controls and operations. </li>
                </ul>
                <div> Docker </div>
                <ul>
                <li> Used as a deployment environment. </li>
                <li> Secure, reproducable, and self-contained. </li>
                <li> Entered through terminals and able to run multiple seperate operations </li>
                </ul>
                <h2> Last Notes </h2>
                <ul>
                <li> Make sure to re-read the <strong> Important Notes before Operation </strong> section again because they are good things to remember. </li>
                <li> The <strong> Getting Started </strong> tab will take you through setting up the Raspbot, Dockers, JupyterLab, and other operations you'll need to know </li>
                <li> Read your lab/assignment instructions twice before starting. It's better to go slow than do things over again because you messed up. </li>
                <li> If you ever get overwelmed by anything, check the other tabs in this webpage. 
                    <ul>
                    <li> <strong> Basic Examples </strong> will help with basic robot operations, giving you a good starting point or base for your assignment. </li>
                    <li> <strong> Advanced Examples </strong> will help you understand the advanced robot operations, giving you more insight into higher level topics and functions. </li>
                    </ul> 
                </li>
                <li> <strong> If you encounter problems </strong>, check the <strong> Common Issues </strong> tab, it may hold solutions. 
                </li>
                <li> Go to your TA's or Professor with any questions or clarifications. </li>
                <ul>
                `
            },
            {
                            
                id: 'getting-started',
                label: 'Getting Started',
                content: `
                <h1> Getting Started </h1>
                
                <h2> Setting up the Raspbot V2 </h2>
                <p> This will guide you through how to boot and set up the Raspbot. It is a simple process but it is important to follow all of the steps carefully. </p>
                <ul>
                <li> Connect the camera USB wire to the USB port located at the back of the robot. </li>
                <li> Flip the switch located under the USB ports. </li>
                <li> Wait for the robot to beep 3 times. </li>
                </ul>
                <p> Things to watch out for </p>
                <ul>
                <li> Take the camera cap is taken off of the front of the camera. Also make sure not to lose it. </li>
                <li> Make sure the camera rotors properly turned the camera to face front center and level of the bot. If you hear the motors running too long, turn the robot off and on again. </li>
                <li> It may take a while for the robot to boot; however, if the robot hasn't beeped in 2-3 minutes, turn it off and back on. </li>
                </ul>

                <h2> Connecting a Device to the Robot's Network </h2>
                <p> Upon starting the robot, a network should appear under wifi like, <i> Raspbot# </i> where <i>#</i> is the number on the sticker of the box of the robot. The password for this network is <i> 12345678 </i> </p>

                <h2> Connecting via app </h2>
                <p> To test with the app, Download the MakerControl app by Yahboom. You can find a QR code on the following site under the 'Downloads' section. </p>
                <p> <i> https://www.yahboom.net/study/RASPBOT-V2 </i> </p> 
                <ul>
                <li> Make sure your device is on the same network as the robot. </li>
                <li> To connect via the app, open the app, and the robot should appear automatically to prompt you to connect. </li>
                <ul> <li> If automatic connect does not work, use the IP address displayed on the OLED screen on top of the robot, select “manual connect”, and type in the robot's IP address. </li> </ul>
                </ul> 
                <p> You should be connected to the app now. </p>


                <h2> Connecting via JupyterLab </h2>
                <p> Used for making, editing, and running python scripts for the robot. Jupyter Labs will be hosted on the robot and can be accessed using any browser on the same network. </p>
                <h3> Access from Another Device </h2>
                <p> In a browser on the same network, type into the search bar: </p>
                <code>http://<i>your_robot_ip</i>:8888/lab</code>
                <p> <i> Password: </i> <strong> Yahboom </strong> </p>
                <h3> Access on the Raspbot </h3>
                <p> Open a browser (second icon from the top left) and type into the search bar, </p>
                <code> localhost:8888/lab </code>
                <ul> <li> The password is: <i> yahboom </i> </li> </ul>

                <h3> Using JupyterLab </h3>
                <p> You can access and run the pre-existing code on your robot or make your own in JupyterLab. </p>
                <p> To run programs, you can either hit the <i> "Restart and run all cells" </i> button that looks like two arrows or the <i> "Run next cell" </i> button that looks like one arrow. </p>
                <p> JupyterLab supports many languages but the Raspbot V2 uses Python. </p>
                
                

                <h2> Connecting via VNC viewer </h2>
                <p> Download VNC Viewer from: <i> https://www.realvnc.com/en/connect/downloads/viewer/ </i>. VNC Veiwer will prompt you to make an account and verify the email address.
                <p> Once VNC Viewer is installed, make sure your device is connected to the same network as the robot. Then, 
                <ul>
                <li> Open VNC Viewer. </li>
                <li> In the bar at the top, enter the IP address of the robot (located on the OLED screen). Click on the VNC server icon to connect.</li>
                    <ul>
                    <li> There may be a warning about the connection being unencrypted. </li>
                    </ul>
                <li>When prompted, enter <i> pi </i> as the username and <i> yahboom </i> as the password. </li>
                    <ul>
                    <li> Be sure to click 'Remember password' when connecting or it may fail. </li>
                    </ul>
                </ul>
                </p>

                <h3> Using VNC Viewer </h3>
                <p> VNC Viewer is how you'll be viewing robot. You can access JupyterLab, Terminals, the Camera app, and much more through VNC Viewer. </p>
                <p> In the VNC Viewer window, the apps you'll use the most are at the top hotbar, with the other apps in the dropdown menu at the left side of that hotbar. 
                <ul> <li> It's recommended to look through these briefly just to know where everything is. </li>
                <li> Note that it may take a while to open applications, make sure to not open the application multiple times while its still opening. </ul> </p>



                <h2> Entering the Docker Container </h2>
                <p> You'll need to be connected to the robot through the VNC Viewer. </p>
                <p> Run the following in one terminal to enter into the docker container.
                <br> <code> source docker_ros2.sh </code>
                <ul> <li> Successful completion should show the terminal hostname as: "<i> root@yahboom </i>" </li> </ul>

                <p> In a new terminal, run,
                <br> <code> docker ps -a </code>
                <ul> <li> You are looking for the most recent container ID. This should be a length 12 alpha-numeric ID. </li> </ul>
                <p> Then run in the same terminal,
                <br> <code> docker exec -it <i> "container_ID" </i> /bin/bash </code>
                <p> You now have two docker terminals to use, run, and retrieve programs from, allowing different applications to run independently. </p>
                <p> To exit your dockers, go back to your original terminal and run,
                <br> <code> exit </code>
                
                <h3> Quick Guide </h3>
                <strong>Terminal 1</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>Terminal 2</strong>
                <br> <strong> 1. </strong> <code> source docker_ros2.sh </code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp
                <strong> 2. </strong> <code> docker ps -a </code>
                <br> <strong> 4. </strong> <code> exit </code> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong> 3. </strong> <code> docker exec -it "container_ID" /bin/bash </code>
                `
            },
            {
                id: 'common-issues',
                label: 'Common Issues',
                content: `
                <h1> Common Issues </h1>
                <p> Here you will find common problems or issues known when using Raspbot V2. </p>
                <ul> 
                <li> If you have an issue that is documented with <strong> no fix stated </strong> or <strong> fix that doesn't work </strong> with your problem, report your problem to a TA or Professor. </li>
                <li> If you encounter an undocumented issue, follow the procedure of the <strong> Undocumented Issues </strong> section second to bottom of the page. </li>
                <li> See <strong> How to Properly Report an Issue </strong> section at the bottom of the page when reporting an issue. </li>
                </ul>

                <h2> Camera Issues </h2>

                <div> Issue: Touching camera wire caused camera crash <div>
                <p> Fix: Turn off robot, unplug camera, plug camera back in, turn on robot. </p>

                <div> Issue: Camera won't work/only showing black </div>
                <p> Fix: Make sure you plugged in camera <strong> before </strong> startup (Turn bot off, plug camera in, turn bot back on). <br> Fix: Make sure camera cap is removed. </p> 


                <h2> Ros2 Issues </h2>

                <div> Issue: ValueError: bad marshal data </div>
                <p> Fix: Let the Professor know.  </p>


                <h2> Undocumented Issues </h2>
                
                <div> Issue: Unknown/Undocumented </div>
                <p> Fix: Try turning robot off and back on again. If issue remains/repeats, let a TA or Professor know of the issue. </p>
                <ul> <li> If the issue is resolved, let the Proffesor or TA know at the end of class what issue you encountered and that it fixed itself on restart </li> </ul>

                <h2> How to Properly Report an Issue </h2>
                <p> It is better to <strong> report an issue earlier </strong> then spending a lot of class time trying to debug it on your own, if the known fixes don't work, report the issue to a TA or Professor.</p>
                <p> Tell your TA or Professor what <strong> issue you are encountering </strong>, what (if any) <strong> fixes you've attempted </strong>, and what <strong> caused this problem </strong> (if you know). </p>
                <ul>
                <li> <i>Example 1:</i> I have <strong> x issue</strong> when I do <strong> y </strong>. I've tried <strong> fix z </strong> I found on the Common Issues page but it didn't work. </li>
                <li> <i>Example 2:</i> I have <strong> x issue </strong>. I don't know what caused it and it's not on the Common Issues page. </li>
                </ul>
                `
            },
            {
                id: 'basic-examples',
                label: 'Basic Examples (Python)',
                content: `<h2>Basic Examples (Python)</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    {
                        id: 'motor-control',
                        label: 'Motor Control',
                        content: `
                            <h2>Motor Control</h2>

                            <h3>1. Install the Raspbot_Lib library</h3>
                            <p>The Raspbot driver functions are required. If you do not have it installed, visit the link below.</p>
                            <p><a href="https://www.yahboom.net/study/Raspbot" target="_blank">Library Installation Link</a></p>

                            <h3>2. Core functions</h3>
                            <p>This guide is written for Raspbot V2 with Mecanum wheels. Mecanum wheels have angled rollers that distribute force diagonally, allowing the robot to move in any direction.</p>
                            <img src="Images/Raspbot/Mecanum_force.png" alt="Mecanum wheel force diagram" style="max-width:500px;">
                            <p>The image below shows each motor and its corresponding ID.</p>
                            <img src="Images/Raspbot/Motor_Display.png" alt="Motor ID diagram" style="max-width:500px;">
                            <ul>
                                <li>Front left = M1</li>
                                <li>Front right = M2</li>
                                <li>Back left = M3</li>
                                <li>Back right = M4</li>
                            </ul>

                            <p><strong>Method 1:</strong></p>
                            <pre><code>Ctrl_Muto(int motor_id, int motor_speed)</code></pre>
                            <p>Controls the motor with the given ID. <code>motor_speed</code> ranges from -255 to 255: positive = forward, negative = backward, 0 = stop.</p>

                            <p><strong>Method 2:</strong></p>
                            <pre><code>Ctrl_Car(int motor_id, int motor_dir, int motor_speed)</code></pre>
                            <p><code>motor_dir</code> is 0 (forward) or 1 (reverse). <code>motor_speed</code> ranges from 0 to 255.</p>
                            <p>Both methods are interchangeable. For example, <code>Ctrl_Muto(M2, -100)</code> is equivalent to <code>Ctrl_Car(M2, 1, 100)</code>.</p>
                            <p>Call either method 4 times (once per motor) to move the robot in a direction. Refer to the table below — speeds must be in the range -255 to 255.</p>

                            <table class="motor_table">
                                <thead>
                                    <tr>
                                        <th>Motion</th>
                                        <th>M1</th>
                                        <th>M2</th>
                                        <th>M3</th>
                                        <th>M4</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Forward</td><td>+</td><td>+</td><td>+</td><td>+</td></tr>
                                    <tr><td>Backward</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
                                    <tr><td>Left Translation</td><td>-</td><td>+</td><td>+</td><td>-</td></tr>
                                    <tr><td>Right Translation</td><td>+</td><td>-</td><td>-</td><td>+</td></tr>
                                    <tr><td>Left Front</td><td>0</td><td>+</td><td>+</td><td>0</td></tr>
                                    <tr><td>Left Rear</td><td>+</td><td>0</td><td>0</td><td>+</td></tr>
                                    <tr><td>Right Front</td><td>+</td><td>0</td><td>0</td><td>+</td></tr>
                                    <tr><td>Right Rear</td><td>0</td><td>+</td><td>+</td><td>0</td></tr>
                                    <tr><td>Counterclockwise (Left Rotation)</td><td>-</td><td>+</td><td>-</td><td>+</td></tr>
                                    <tr><td>Clockwise (Right Rotation)</td><td>+</td><td>-</td><td>+</td><td>-</td></tr>
                                    <tr><td>Stop</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
                                </tbody>
                            </table>

                            <h3>3. Sample code — Raspbot standard library</h3>
                            <pre><code>from Raspbot_Lib import Raspbot
import time

bot = Raspbot()

# Move forward for 1 second then stop
bot.Ctrl_Muto(1, 150)
bot.Ctrl_Muto(2, 150)
bot.Ctrl_Muto(3, 150)
bot.Ctrl_Muto(4, 150)
time.sleep(1)

bot.Ctrl_Muto(1, 0)
bot.Ctrl_Muto(2, 0)
bot.Ctrl_Muto(3, 0)
bot.Ctrl_Muto(4, 0)</code></pre>

                            <h3>4. McLumk_Wheel_Sports library functions</h3>
                            <p>This library is included with <code>Raspbot_lib</code> — no separate installation needed. It provides ready-made movement functions for Mecanum wheels. Each function takes a <code>speed</code> parameter from 0 to 255 (0 = stop, higher = faster).</p>
                            <pre><code>move_forward(int speed)
move_backward(int speed)
move_right(int speed)
move_left(int speed)
move_diagonal_left_front(int speed)
move_diagonal_right_front(int speed)
move_diagonal_left_back(int speed)
move_diagonal_right_back(int speed)
rotate_right(int speed)
rotate_left(int speed)</code></pre>

                            <h3>5. Sample code — McLumk_Wheel_Sports library</h3>
                            <pre><code>from Raspbot_Lib import Raspbot
from McLumk_Wheel_Sports import McLumk
import time

bot = Raspbot()
wheels = McLumk(bot)

# Move forward for 1 second, then turn right for 0.5s, then stop
wheels.move_forward(150)
time.sleep(1)
wheels.rotate_right(100)
time.sleep(0.5)
wheels.move_forward(0)</code></pre>
                        `
                    },
                    {
                        id: 'be-basic-move',
                        label: 'Basic Move',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'be-camera-servos',
                        label: 'Read/Write Camera Servos',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'be-buzzer',
                        label: 'Control Buzzer',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'be-light',
                        label: 'Control Light',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'be-ultrasonic',
                        label: 'Ultrasonic',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'be-ir',
                        label: 'IR',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'Camera',
                        label: 'Camera',
                        content: `
                            <h2>Camera</h2>

                            <h3>1. OpenCV</h3>
                            <p>OpenCV (Open Source Computer Vision Library) provides methods for computational vision using RGB color data. This page focuses on the functions needed to connect to and read from the Raspbot camera. For deeper exploration, see the links below.</p>
                            <ul>
                                <li><a href="https://opencv.org/" target="_blank">OpenCV Official Site</a></li>
                                <li><a href="https://docs.opencv.org/4.x/d0/d3d/tutorial_general_install.html" target="_blank">OpenCV Installation Guide</a></li>
                                <li><a href="https://docs.opencv.org/3.4/d8/dfe/classcv_1_1VideoCapture.html" target="_blank">VideoCapture API Reference</a></li>
                            </ul>

                            <h3>2. Core functions</h3>

                            <p><code>cv2.VideoCapture(argument)</code> — Opens a camera or video source. Pass <code>0</code> to connect to the default camera or Raspberry Pi video device.</p>

                            <p><code>camera.set(setting, numeric_value)</code> — Configures camera properties. The table below lists the most common settings. Not all settings are supported by every camera (e.g. hue and saturation may not apply).</p>

                            <table class="camera_table">
                                <thead>
                                    <tr>
                                        <th>Setting value</th>
                                        <th>Setting name</th>
                                        <th>Functionality</th>
                                        <th>Common value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>3</td><td>CV_CAP_PROP_FRAME_WIDTH</td><td>Frame width</td><td>1920</td></tr>
                                    <tr><td>4</td><td>CV_CAP_PROP_FRAME_HEIGHT</td><td>Frame height</td><td>1080</td></tr>
                                    <tr><td>5</td><td>CV_CAP_PROP_FPS</td><td>Frame rate</td><td>30</td></tr>
                                    <tr><td>10</td><td>CV_CAP_PROP_BRIGHTNESS</td><td>Brightness</td><td>1</td></tr>
                                    <tr><td>11</td><td>CV_CAP_PROP_CONTRAST</td><td>Contrast</td><td>40</td></tr>
                                    <tr><td>12</td><td>CV_CAP_PROP_SATURATION</td><td>Saturation</td><td>50</td></tr>
                                    <tr><td>13</td><td>CV_CAP_PROP_HUE</td><td>Hue</td><td>50</td></tr>
                                    <tr><td>15</td><td>CV_CAP_PROP_EXPOSURE</td><td>Exposure</td><td>50</td></tr>
                                </tbody>
                            </table>
                            <p>Other settings exist in OpenCV but should not be modified unless necessary. See the <a href="https://docs.opencv.org/3.4/d4/d15/group__videoio__flags__base.html" target="_blank">full list of camera properties</a>.</p>

                            <p><code>camera.isOpened()</code> — Returns <code>True</code> if the camera opened successfully, <code>False</code> otherwise.</p>

                            <p><code>ret, frame = camera.read()</code> — Reads one frame from the camera. <code>ret</code> is a boolean that is <code>True</code> on success. <code>frame</code> is a 3D matrix (height × width × 3 color channels) representing the image.</p>

                            <p><code>cv2.waitKey(delay)</code> — Waits for a key press. Pass a positive number for a delay in milliseconds (e.g. <code>waitKey(1)</code> = 1 ms between frames). Passing <code>0</code> pauses on the current frame indefinitely. Avoid large values like 1000 as they cause noticeable lag.</p>

                            <p><code>camera.release()</code> and <code>cv2.destroyAllWindows()</code> — Always call these at the end of any script that uses the camera. If you stop a script early without releasing the camera, it stays locked in the background and future programs will be denied access.</p>

                            <h3>3. Sample code — opening the camera with OpenCV</h3>
                            <pre><code>import cv2

camera = cv2.VideoCapture(0)

# Optional: configure resolution and frame rate
camera.set(3, 1280)   # width
camera.set(4, 720)    # height
camera.set(5, 30)     # fps

if not camera.isOpened():
    print("Error: Could not open camera.")
else:
    while True:
        ret, frame = camera.read()
        if not ret:
            break
        cv2.imshow("Raspbot Camera", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

camera.release()
cv2.destroyAllWindows()</code></pre>
                        `
                    },
                ],
                content: `<h2>Basic Examples (Python)</h2><p>Select a topic from the sidebar to get started.</p>`
            },
            {
                id: 'advanced-examples',
                label: 'Advanced Examples',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`,
                children: [
                    {
                        id: 'ae-python',
                        label: 'Python',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`,
                        children: [
                            {
                                id: 'ae-python-ultrasonic',
                                label: 'Ultrasonic',
                                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                            }
                        ],
                content: `<h2>Python Examples</h2><p>Select a topic from the sidebar to get started.</p>`
                    },
                    {
                        id: 'ae-ros',
                        label: 'ROS',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`,
                        children: [
                            {
                                id: 'ae-ros-gesture',
                                label: 'Gesture Recognition',
                                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                            }
                        ],
                content: `<h2>Ultrasonic</h2><p>Select a topic from the sidebar to get started.</p>`
                    }
                ]
            },
            {
                id: 'additional-resources',
                label: 'Additional Resources',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`,
                children: [
                    {
                        id: 'res-opencv',
                        label: 'OpenCV',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'res-python',
                        label: 'Python',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'res-ros2',
                        label: 'ROS2',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    },
                    {
                        id: 'res-docker',
                        label: 'Docker',
                        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
                    }
                ],
                content: `<h2>Gesture Recognition</h2><p>Select a topic from the sidebar to get started.</p>`
            },
            {
                id: 'professor-notes',
                label: 'Professor Notes',
                internal: true,
                content: `
                    <h2>Professor Notes — Internal</h2>
                    <div class="doc-note warning"><strong>This section is only visible to logged-in professors.</strong></div>
                    <h3>Lab Assignment Tips</h3>
                    <ul>
                        <li>Raspbot is used in Robotics 2 — assumes students already completed DOFBOT labs.</li>
                        <li>Common student mistake: forgetting to enable the camera interface via <code>raspi-config</code>.</li>
                        <li>Obstacle avoidance lab works best with the ultrasonic sensor mounted at 15cm height.</li>
                    </ul>
                `
            }
        ]
    },
    {
        id: 'dogzilla',
        name: 'Dogzilla',
        description: 'Quadruped robot dog with advanced locomotion and dynamic balance control.',
        image: 'images/index/dogzilla.jpg',
        difficulty: 'Intro to Robot Programming',
        tags: ['ROS2 Humble', 'Raspberry Pi 5', 'RGB Camera','Legged Locomotion'],
        sections: [
            {
                id: 'overview',
                label: 'Overview',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'getting-started',
                label: 'Getting Started',
                                content: `<h2>Getting Started</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    { id: 'dz-gs-power',   label: 'Powering On',         content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'dz-gs-app',     label: 'Connect via App',     content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'dz-gs-ssh',     label: 'SSH & Terminal',      content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` }
                ],
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'gait',
                label: 'Gait Patterns',
                                content: `<h2>Gait Patterns</h2><p>Select a topic from the sidebar to get started.</p>`,
                children: [
                    { id: 'dz-gait-walk',  label: 'Walking',             content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'dz-gait-trot',  label: 'Trotting',            content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` },
                    { id: 'dz-gait-custom',label: 'Custom Gaits',        content: `<div class="coming-soon-banner">🚧 Coming Soon</div>` }
                ],
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'balance',
                label: 'Balance Control',
                content: `<div class="coming-soon-banner">🚧 Coming Soon</div>`
            },
            {
                id: 'professor-notes',
                label: 'Professor Notes',
                internal: true,
                content: `
                    <h2>Professor Notes — Internal</h2>
                    <div class="doc-note warning"><strong>This section is only visible to logged-in professors.</strong></div>
                    <h3>Hardware Notes</h3>
                    <ul>
                        <li>Dogzilla's feet wear down over time — inspect rubber pads before each lab session.</li>
                        <li>Do not run balance demos on smooth floors without the anti-slip mat.</li>
                        <li>Battery charges to full in ~2 hours. Low battery causes erratic gait — charge before labs.</li>
                    </ul>
                `
            }
        ]
    }
];

window.roboticsKits = roboticsKits;

// ================================================
// SITE IMAGES REGISTRY
// Add any image filenames in this folder here.
// They will appear in the Markdown editor image picker.
// ================================================
// siteImages is now loaded automatically from the server.
// Any image added to the /images folder will instantly appear
// in the professor admin image picker — no code changes needed.
// Populated at runtime by app.js via GET /api/images
window.siteImages = [];