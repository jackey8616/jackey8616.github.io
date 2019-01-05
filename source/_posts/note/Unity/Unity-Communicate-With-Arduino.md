---
title: Unity communicate with Arduino by Serial
date: 2019-01-05 21:44:55
tags:
 - Unity
 - Arduino
 - Serial
 - Note
categories: Note
---

Arduino如何使用Serial序列埠與Unity溝通。

<!-- More -->

# 0x0 環境
- Arduino Uno v3
- Unity 2018.1.4f1 (64bit)
- Visual Studio C#

# 0x1 前置設定
Unity設定需將`Api Compatibility Level`設為`Net2.0`.  
按照教學, 還需要更改`Scripting Runtime Version`設為`.Net 4.x Equivalent`.
具體設定的路徑為`Edit > Project Settings > Player > (Inspector) > Other Settings > Configuration`.  
如果沒有做好以上兩點設定, 在Script中將無法`using System.IO.Ports`.

# 0x2 Arduino 程式碼

```arduino
void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.write("1");
  if (Serial.avaliable()) {
    String data = Searil.read();
    ...
  }
}

```

# 0x30 Unity 程式碼

```Csharp
using System.IO.Ports;

public class ArduinoControl : MonoBehaviour {

    private SerialPort sp;
    private int readTimeout = 1;

    void Start () {
        sp = new SerialPort("COM7", 9600);
        if (!sp.IsOpen) {
            sp.Open();
            sp.ReadTimeout = readTimeout;
        }
    }

    void Update () {
        if (sp.IsOpen) {
            // Write
            sp.Write(....);
            // Read
            try {
                sp.Read(....);
            } catch (System.TimeoutException e) {
                // Timeout exception.
            }
        }
    }

    public void Teardown () {
        if (sp.IsOpen)
            sp.Close();
    }

}
```
## 0x31 SerialPort
Arduino的部份比較容易, 基本上依樣畫葫蘆就可以了。  
比較困難的集中在C#中。  
```Csharp
SerialPort sp = new SerialPort("序列埠號", 鮑率);
```
Arduino跟C#的程式必須使用相同的鮑率, 否則讀取速度不一致, 資料會呈現亂碼。  

# 0x4 Confusions
這本來是幫朋友做的一個裝置溝通的部份程式碼。  
有遇到關於`Slow reading`的問題。  
也就是Arduino端已經送出了Serial資料，但是Unity卻沒有即時收到資料的狀況。  
得花很久之後才會收到。  

目前是暫時用下面的程式碼去處理。  
有需要的朋友可以參考看看，如果有找出原因也拜託留言跟我說一下。
```arduino
int sw, lastSend;
int debounceDelay = 5;

void setup() {
  Serial.begin(9600);
  pinMode(2,INPUT);
}

void loop() {
  sw = digitalRead(2);
  if (sw != lastSend) {
    lastSend = sw;
    Serial.println(lastSend);
  }
}
```

```Csharp
using UnityEngine;
using System.IO.Ports;

public class ArduinoController : MonoBehaviour {

    public SerialPort sp;
    public int readTimeout = 1000;
    public float readDelay = 0.4F;

    private float leftPeriod;
    private string arduinoData;

    void Start()
    {
        this.leftPeriod = this.readDelay;
        this.sp = new SerialPort("/dev/tty.usbmodem14101", 9600);
        if (!sp.IsOpen) {
            sp.Open();
            sp.ReadTimeout = readTimeout;
        }
    }

    void Update() {
        leftPeriod -= Time.deltaTime;
        if (leftPeriod < 0 && sp.IsOpen) {
            try {
                string tempData = sp.ReadLine();
                if (!tempData.Equals(arduinoData)) {
                    arduinoData = tempData;
                    Debug.Log(arduinoData);
                }
            } catch (System.TimeoutException e) {
                throw;
            }
            leftPeriod = readDelay;
        }

    }

    public void Teardown() {
        if (sp.IsOpen)
            sp.Close();
    }
}
```

# 0x5 Others
使用Arduino的開關，除非有特地挑選過使用的開關種類，
不然大多會有`彈跳(bounce)`的問題，在這邊不多贅述，
有機會開篇來講何謂彈跳以及其`去彈跳(debounce)`的設計方法。

# 0x6 Reference
[Microsoft Docs - System.IO.Ports](https://docs.microsoft.com/zh-tw/dotnet/api/system.io.ports?view=netframework-4.7.2)  
[Arduino Serial](https://www.arduino.cc/reference/en/language/functions/communication/serial/)  
