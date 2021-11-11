<template>
  <div class="color-converter">
    <div class="color-list">
      <div class="color-list-item">
        <p class="color-list-item_name">HEX:</p>
        <div class="color-list-item_input">
          <input type="text" placeholder="请输入hex类型颜色" v-model="hexValue" class="color-list-item_input_value" />
          <p class="color-list-item_input_tip" v-show="hexErrTip">
            <span>*</span>
            <span>{{ hexErrTip }}</span>
          </p>
        </div> 
        <button class="color-list-item_button" @click="handleHex">转换</button>
        <div class="color-list-item_show">
          <span class="color-list-item_show_name">rgb:</span>
          <span>{{ hexToRgb }}</span>
        </div>
        <div class="color-list-item_show">
          <span class="color-list-item_show_name">hsl:</span>
          <span>{{ hexToHsl }}</span>
        </div>
        <div class="color-list-item_template" :style="{ 'background-color': hexTemplateColor }"></div>
      </div>
      <div class="color-list-item">
        <p class="color-list-item_name">RGB:</p>
        <div class="color-list-item_input">
          <div class="color-list-item_input_list">
            <input type="number" min="0" oninput="this.value=this.value.replace(/\D/g)" placeholder="r" v-model="rgbValue[0]" class="color-list-item_input_value" />
            <input type="number" min="0" oninput="this.value=this.value.replace(/\D/g)" placeholder="g" v-model="rgbValue[1]" class="color-list-item_input_value my_m_rl_8" />
            <input type="number" min="0" oninput="this.value=this.value.replace(/\D/g)" placeholder="b" v-model="rgbValue[2]" class="color-list-item_input_value" />
          </div>
          <p class="color-list-item_input_tip" v-show="rgbErrTip">
            <span>*</span>
            <span>{{ rgbErrTip }}</span>
          </p>
        </div>
        <button class="color-list-item_button" @click="handleRgb">转换</button>
        <div class="color-list-item_show">
          <span class="color-list-item_show_name">hex:</span>
          <span>{{ rgbToHex }}</span>
        </div>
        <div class="color-list-item_show">
          <span class="color-list-item_show_name">hsl:</span>
          <span>{{ rgbToHsl }}</span>
        </div>
        <div class="color-list-item_template" :style="{ 'background-color': rgbTemplateColor }"></div>
      </div>
      <div class="color-list-item">
        <p class="color-list-item_name">HSL:</p>
        <div class="color-list-item_input">
          <div class="color-list-item_input_list">
            <input type="number" placeholder="h" v-model="hslValue[0]" class="color-list-item_input_value" />
            <input type="number" placeholder="s" v-model="hslValue[1]" class="color-list-item_input_value my_m_rl_8" />
            <input type="number" placeholder="l" v-model="hslValue[2]" class="color-list-item_input_value" />
          </div>
          <p class="color-list-item_input_tip" v-show="hslErrTip">
            <span>*</span>
            <span>{{ hslErrTip }}</span>
          </p>
        </div>
        <button class="color-list-item_button" @click="handleHsl">转换</button>
        <div class="color-list-item_show">
          <span class="color-list-item_show_name">hex:</span>
          <span>{{ hslToHex }}</span>
        </div>
        <div class="color-list-item_show">
          <span class="color-list-item_show_name">rgb:</span>
          <span>{{ hslToRgb }}</span>
        </div>
        <div class="color-list-item_template" :style="{ 'background-color': hslTemplateColor }"></div>
      </div>
    </div>
    <h4>颜色码对照表</h4>
    <table bordercolor="#cccccc" width="100%" border="1" style="font-size:14px">
      <tbody>
        <tr>
          <td><strong>颜色</strong></td>
          <td><strong>英文代码</strong></td>
          <td><strong>形象描述</strong></td>
          <td><strong>十六进制</strong></td>
          <td><strong>RGB</strong></td>
        </tr>
        <tr>
          <td bgcolor="#ffb6c1"></td>
          <td>LightPink</td>
          <td>浅粉红</td>
          <td>#FFB6C1</td>
          <td>255,182,193</td>
        </tr>
        <tr>
          <td bgcolor="#ffc0cb"></td>
          <td>Pink</td>
          <td>粉红</td>
          <td>#FFC0CB</td>
          <td>255,192,203</td>
        </tr>
        <tr>
          <td bgcolor="#dc143c"></td>
          <td>Crimson</td>
          <td>猩红</td>
          <td>#DC143C</td>
          <td>220,20,60</td>
        </tr>
        <tr>
          <td bgcolor="#fff0f5"></td>
          <td>LavenderBlush</td>
          <td>脸红的淡紫色</td>
          <td>#FFF0F5</td>
          <td>255,240,245</td>
        </tr>
        <tr>
          <td bgcolor="#db7093"></td>
          <td>PaleVioletRed</td>
          <td>苍白的紫罗兰红色</td>
          <td>#DB7093</td>
          <td>219,112,147</td>
        </tr>
        <tr>
          <td bgcolor="#ff69b4"></td>
          <td>HotPink</td>
          <td>热情的粉红</td>
          <td>#FF69B4</td>
          <td>255,105,180</td>
        </tr>
        <tr>
          <td bgcolor="#ff1493"></td>
          <td>DeepPink</td>
          <td>深粉色</td>
          <td>#FF1493</td>
          <td>255,20,147</td>
        </tr>
        <tr>
          <td bgcolor="#c71585"></td>
          <td>MediumVioletRed</td>
          <td>适中的紫罗兰红色</td>
          <td>#C71585</td>
          <td>199,21,133</td>
        </tr>
        <tr>
          <td bgcolor="#da70d6"></td>
          <td>Orchid</td>
          <td>兰花的紫色</td>
          <td>#DA70D6</td>
          <td>218,112,214</td>
        </tr>
        <tr>
          <td bgcolor="#d8bfd8"></td>
          <td>Thistle</td>
          <td>蓟</td>
          <td>#D8BFD8</td>
          <td>216,191,216</td>
        </tr>
        <tr>
          <td bgcolor="#dda0dd"></td>
          <td>plum</td>
          <td>李子</td>
          <td>#DDA0DD</td>
          <td>221,160,221</td>
        </tr>
        <tr>
          <td bgcolor="#ee82ee"></td>
          <td>Violet</td>
          <td>紫罗兰</td>
          <td>#EE82EE</td>
          <td>238,130,238</td>
        </tr>
        <tr>
          <td bgcolor="#ff00ff"></td>
          <td>Magenta</td>
          <td>洋红</td>
          <td>#FF00FF</td>
          <td>255,0,255</td>
        </tr>
        <tr>
          <td bgcolor="#ff00ff"></td>
          <td>Fuchsia</td>
          <td>灯笼海棠(紫红色)</td>
          <td>#FF00FF</td>
          <td>255,0,255</td>
        </tr>
        <tr>
          <td bgcolor="#8b008b"></td>
          <td>DarkMagenta</td>
          <td>深洋红色</td>
          <td>#8B008B</td>
          <td>139,0,139</td>
        </tr>
        <tr>
          <td bgcolor="#800080"></td>
          <td>Purple</td>
          <td>紫色</td>
          <td>#800080</td>
          <td>128,0,128</td>
        </tr>
        <tr>
          <td bgcolor="#ba55d3"></td>
          <td>MediumOrchid</td>
          <td>适中的兰花紫</td>
          <td>#BA55D3</td>
          <td>186,85,211</td>
        </tr>
        <tr>
          <td bgcolor="#9400d3"></td>
          <td>DarkVoilet</td>
          <td>深紫罗兰色</td>
          <td>#9400D3</td>
          <td>148,0,211</td>
        </tr>
        <tr>
          <td bgcolor="#9932cc"></td>
          <td>DarkOrchid</td>
          <td>深兰花紫</td>
          <td>#9932CC</td>
          <td>153,50,204</td>
        </tr>
        <tr>
          <td bgcolor="#4b0082"></td>
          <td>Indigo</td>
          <td>靛青</td>
          <td>#4B0082</td>
          <td>75,0,130</td>
        </tr>
        <tr>
          <td bgcolor="#8a2be2"></td>
          <td>BlueViolet</td>
          <td>深紫罗兰的蓝色</td>
          <td>#8A2BE2</td>
          <td>138,43,226</td>
        </tr>
        <tr>
          <td bgcolor="#9370db"></td>
          <td>MediumPurple</td>
          <td>适中的紫色</td>
          <td>#9370DB</td>
          <td>147,112,219</td>
        </tr>
        <tr>
          <td bgcolor="#7b68ee"></td>
          <td>MediumSlateBlue</td>
          <td>适中的板岩暗蓝灰色</td>
          <td>#7B68EE</td>
          <td>123,104,238</td>
        </tr>
        <tr>
          <td bgcolor="#6a5acd"></td>
          <td>SlateBlue</td>
          <td>板岩暗蓝灰色</td>
          <td>#6A5ACD</td>
          <td>106,90,205</td>
        </tr>
        <tr>
          <td bgcolor="#483d8b"></td>
          <td>DarkSlateBlue</td>
          <td>深岩暗蓝灰色</td>
          <td>#483D8B</td>
          <td>72,61,139</td>
        </tr>
        <tr>
          <td bgcolor="#e6e6fa"></td>
          <td>Lavender</td>
          <td>熏衣草花的淡紫色</td>
          <td>#E6E6FA</td>
          <td>230,230,250</td>
        </tr>
        <tr>
          <td bgcolor="#f8f8ff"></td>
          <td>GhostWhite</td>
          <td>幽灵的白色</td>
          <td>#F8F8FF</td>
          <td>248,248,255</td>
        </tr>
        <tr>
          <td bgcolor="#0000ff"></td>
          <td>Blue</td>
          <td>纯蓝</td>
          <td>#0000FF</td>
          <td>0,0,255</td>
        </tr>
        <tr>
          <td bgcolor="#0000cd"></td>
          <td>MediumBlue</td>
          <td>适中的蓝色</td>
          <td>#0000CD</td>
          <td>0,0,205</td>
        </tr>
        <tr>
          <td bgcolor="#191970"></td>
          <td>MidnightBlue</td>
          <td>午夜的蓝色</td>
          <td>#191970</td>
          <td>25,25,112</td>
        </tr>
        <tr>
          <td bgcolor="#00008b"></td>
          <td>DarkBlue</td>
          <td>深蓝色</td>
          <td>#00008B</td>
          <td>0,0,139</td>
        </tr>
        <tr>
          <td bgcolor="#000080"></td>
          <td>Navy</td>
          <td>海军蓝</td>
          <td>#000080</td>
          <td>0,0,128</td>
        </tr>
        <tr>
          <td bgcolor="#4169e1"></td>
          <td>RoyalBlue</td>
          <td>皇家蓝</td>
          <td>#4169E1</td>
          <td>65,105,225</td>
        </tr>
        <tr>
          <td bgcolor="#6495ed"></td>
          <td>CornflowerBlue</td>
          <td>矢车菊的蓝色</td>
          <td>#6495ED</td>
          <td>100,149,237</td>
        </tr>
        <tr>
          <td bgcolor="#b0c4de"></td>
          <td>LightSteelBlue</td>
          <td>淡钢蓝</td>
          <td>#B0C4DE</td>
          <td>176,196,222</td>
        </tr>
        <tr>
          <td bgcolor="#778899"></td>
          <td>LightSlateGray</td>
          <td>浅石板灰</td>
          <td>#778899</td>
          <td>119,136,153</td>
        </tr>
        <tr>
          <td bgcolor="#708090"></td>
          <td>SlateGray</td>
          <td>石板灰</td>
          <td>#708090</td>
          <td>112,128,144</td>
        </tr>
        <tr>
          <td bgcolor="#1e90ff"></td>
          <td>DoderBlue</td>
          <td>道奇蓝</td>
          <td>#1E90FF</td>
          <td>30,144,255</td>
        </tr>
        <tr>
          <td bgcolor="#f0f8ff"></td>
          <td>AliceBlue</td>
          <td>爱丽丝蓝</td>
          <td>#F0F8FF</td>
          <td>240,248,255</td>
        </tr>
        <tr>
          <td bgcolor="#4682b4"></td>
          <td>SteelBlue</td>
          <td>钢蓝</td>
          <td>#4682B4</td>
          <td>70,130,180</td>
        </tr>
        <tr>
          <td bgcolor="#87cefa"></td>
          <td>LightSkyBlue</td>
          <td>淡蓝色</td>
          <td>#87CEFA</td>
          <td>135,206,250</td>
        </tr>
        <tr>
          <td bgcolor="#87ceeb"></td>
          <td>SkyBlue</td>
          <td>天蓝色</td>
          <td>#87CEEB</td>
          <td>135,206,235</td>
        </tr>
        <tr>
          <td bgcolor="#00bfff"></td>
          <td>DeepSkyBlue</td>
          <td>深天蓝</td>
          <td>#00BFFF</td>
          <td>0,191,255</td>
        </tr>
        <tr>
          <td bgcolor="#add8e6"></td>
          <td>LightBLue</td>
          <td>淡蓝</td>
          <td>#ADD8E6</td>
          <td>173,216,230</td>
        </tr>
        <tr>
          <td bgcolor="#b0e0e6"></td>
          <td>PowDerBlue</td>
          <td>火药蓝</td>
          <td>#B0E0E6</td>
          <td>176,224,230</td>
        </tr>
        <tr>
          <td bgcolor="#5f9ea0"></td>
          <td>CadetBlue</td>
          <td>军校蓝</td>
          <td>#5F9EA0</td>
          <td>95,158,160</td>
        </tr>
        <tr>
          <td bgcolor="#f0ffff"></td>
          <td>Azure</td>
          <td>蔚蓝色</td>
          <td>#F0FFFF</td>
          <td>240,255,255</td>
        </tr>
        <tr>
          <td bgcolor="#e1ffff"></td>
          <td>LightCyan</td>
          <td>淡青色</td>
          <td>#E1FFFF</td>
          <td>225,255,255</td>
        </tr>
        <tr>
          <td bgcolor="#afeeee"></td>
          <td>PaleTurquoise</td>
          <td>苍白的绿宝石</td>
          <td>#AFEEEE</td>
          <td>175,238,238</td>
        </tr>
        <tr>
          <td bgcolor="#00ffff"></td>
          <td>Cyan</td>
          <td>青色</td>
          <td>#00FFFF</td>
          <td>0,255,255</td>
        </tr>
        <tr>
          <td bgcolor="#d4f2e7"></td>
          <td>Aqua</td>
          <td>水绿色</td>
          <td>#D4F2E7</td>
          <td>212,242,231</td>
        </tr>
        <tr>
          <td bgcolor="#00ced1"></td>
          <td>DarkTurquoise</td>
          <td>深绿宝石</td>
          <td>#00CED1</td>
          <td>0,206,209</td>
        </tr>
        <tr>
          <td bgcolor="#2f4f4f"></td>
          <td>DarkSlateGray</td>
          <td>深石板灰</td>
          <td>#2F4F4F</td>
          <td>47,79,79</td>
        </tr>
        <tr>
          <td bgcolor="#008b8b"></td>
          <td>DarkCyan</td>
          <td>深青色</td>
          <td>#008B8B</td>
          <td>0,139,139</td>
        </tr>
        <tr>
          <td bgcolor="#008080"></td>
          <td>Teal</td>
          <td>水鸭色</td>
          <td>#008080</td>
          <td>0,128,128</td>
        </tr>
        <tr>
          <td bgcolor="#48d1cc"></td>
          <td>MediumTurquoise</td>
          <td>适中的绿宝石</td>
          <td>#48D1CC</td>
          <td>72,209,204</td>
        </tr>
        <tr>
          <td bgcolor="#20b2aa"></td>
          <td>LightSeaGreen</td>
          <td>浅海洋绿</td>
          <td>#20B2AA</td>
          <td>32,178,170</td>
        </tr>
        <tr>
          <td bgcolor="#40e0d0"></td>
          <td>Turquoise</td>
          <td>绿宝石</td>
          <td>#40E0D0</td>
          <td>64,224,208</td>
        </tr>
        <tr>
          <td bgcolor="#7fffaa"></td>
          <td>Auqamarin</td>
          <td>绿玉\碧绿色</td>
          <td>#7FFFAA</td>
          <td>127,255,170</td>
        </tr>
        <tr>
          <td bgcolor="#00fa9a"></td>
          <td>MediumAquamarine</td>
          <td>适中的碧绿色</td>
          <td>#00FA9A</td>
          <td>0,250,154</td>
        </tr>
        <tr>
          <td bgcolor="#00ff7f"></td>
          <td>MediumSpringGreen</td>
          <td>适中的春天的绿色</td>
          <td>#00FF7F</td>
          <td>0,255,127</td>
        </tr>
        <tr>
          <td bgcolor="#f5fffa"></td>
          <td>MintCream</td>
          <td>薄荷奶油</td>
          <td>#F5FFFA</td>
          <td>245,255,250</td>
        </tr>
        <tr>
          <td bgcolor="#3cb371"></td>
          <td>SpringGreen</td>
          <td>春天的绿色</td>
          <td>#3CB371</td>
          <td>60,179,113</td>
        </tr>
        <tr>
          <td bgcolor="#2e8b57"></td>
          <td>SeaGreen</td>
          <td>海洋绿</td>
          <td>#2E8B57</td>
          <td>46,139,87</td>
        </tr>
        <tr>
          <td bgcolor="#f0fff0"></td>
          <td>Honeydew</td>
          <td>蜂蜜</td>
          <td>#F0FFF0</td>
          <td>240,255,240</td>
        </tr>
        <tr>
          <td bgcolor="#90ee90"></td>
          <td>LightGreen</td>
          <td>淡绿色</td>
          <td>#90EE90</td>
          <td>144,238,144</td>
        </tr>
        <tr>
          <td bgcolor="#98fb98"></td>
          <td>PaleGreen</td>
          <td>苍白的绿色</td>
          <td>#98FB98</td>
          <td>152,251,152</td>
        </tr>
        <tr>
          <td bgcolor="#8fbc8f"></td>
          <td>DarkSeaGreen</td>
          <td>深海洋绿</td>
          <td>#8FBC8F</td>
          <td>143,188,143</td>
        </tr>
        <tr>
          <td bgcolor="#32cd32"></td>
          <td>LimeGreen</td>
          <td>酸橙绿</td>
          <td>#32CD32</td>
          <td>50,205,50</td>
        </tr>
        <tr>
          <td bgcolor="#00ff00"></td>
          <td>Lime</td>
          <td>酸橙色</td>
          <td>#00FF00</td>
          <td>0,255,0</td>
        </tr>
        <tr>
          <td bgcolor="#228b22"></td>
          <td>ForestGreen</td>
          <td>森林绿</td>
          <td>#228B22</td>
          <td>34,139,34</td>
        </tr>
        <tr>
          <td bgcolor="#008000"></td>
          <td>Green</td>
          <td>纯绿</td>
          <td>#008000</td>
          <td>0,128,0</td>
        </tr>
        <tr>
          <td bgcolor="#006400"></td>
          <td>DarkGreen</td>
          <td>深绿色</td>
          <td>#006400</td>
          <td>0,100,0</td>
        </tr>

        <tr>
          <td bgcolor="#7fff00"></td>
          <td>Chartreuse</td>
          <td>查特酒绿</td>
          <td>#7FFF00</td>
          <td>127,255,0</td>
        </tr>
        <tr>
          <td bgcolor="#7cfc00"></td>
          <td>LawnGreen</td>
          <td>草坪绿</td>
          <td>#7CFC00</td>
          <td>124,252,0</td>
        </tr>
        <tr>
          <td bgcolor="#adff2f"></td>
          <td>GreenYellow</td>
          <td>绿黄色</td>
          <td>#ADFF2F</td>
          <td>173,255,47</td>
        </tr>
        <tr>
          <td bgcolor="#556b2f"></td>
          <td>OliveDrab</td>
          <td>橄榄土褐色</td>
          <td>#556B2F</td>
          <td>85,107,47</td>
        </tr>
        <tr>
          <td bgcolor="#f5f5dc"></td>
          <td>Beige</td>
          <td>米色(浅褐色)</td>
          <td>#F5F5DC</td>
          <td>245,245,220</td>
        </tr>
        <tr>
          <td bgcolor="#fafad2"></td>
          <td>LightGoldenrodYellow</td>
          <td>浅秋麒麟黄</td>
          <td>#FAFAD2</td>
          <td>250,250,210</td>
        </tr>
        <tr>
          <td bgcolor="#fffff0"></td>
          <td>Ivory</td>
          <td>象牙</td>
          <td>#FFFFF0</td>
          <td>255,255,240</td>
        </tr>
        <tr>
          <td bgcolor="#ffffe0"></td>
          <td>LightYellow</td>
          <td>浅黄色</td>
          <td>#FFFFE0</td>
          <td>255,255,224</td>
        </tr>
        <tr>
          <td bgcolor="#ffff00"></td>
          <td>Yellow</td>
          <td>纯黄</td>
          <td>#FFFF00</td>
          <td>255,255,0</td>
        </tr>
        <tr>
          <td bgcolor="#808000"></td>
          <td>Olive</td>
          <td>橄榄</td>
          <td>#808000</td>
          <td>128,128,0</td>
        </tr>
        <tr>
          <td bgcolor="#bdb76b"></td>
          <td>DarkKhaki</td>
          <td>深卡其布</td>
          <td>#BDB76B</td>
          <td>189,183,107</td>
        </tr>
        <tr>
          <td bgcolor="#fffacd"></td>
          <td>LemonChiffon</td>
          <td>柠檬薄纱</td>
          <td>#FFFACD</td>
          <td>255,250,205</td>
        </tr>
        <tr>
          <td bgcolor="#eee8aa"></td>
          <td>PaleGodenrod</td>
          <td>灰秋麒麟</td>
          <td>#EEE8AA</td>
          <td>238,232,170</td>
        </tr>
        <tr>
          <td bgcolor="#f0e68c"></td>
          <td>Khaki</td>
          <td>卡其布</td>
          <td>#F0E68C</td>
          <td>240,230,140</td>
        </tr>
        <tr>
          <td bgcolor="#ffd700"></td>
          <td>Gold</td>
          <td>金</td>
          <td>#FFD700</td>
          <td>255,215,0</td>
        </tr>
        <tr>
          <td bgcolor="#fff8dc"></td>
          <td>Cornislk</td>
          <td>玉米色</td>
          <td>#FFF8DC</td>
          <td>255,248,220</td>
        </tr>
        <tr>
          <td bgcolor="#daa520"></td>
          <td>GoldEnrod</td>
          <td>秋麒麟</td>
          <td>#DAA520</td>
          <td>218,165,32</td>
        </tr>
        <tr>
          <td bgcolor="#fffaf0"></td>
          <td>FloralWhite</td>
          <td>花的白色</td>
          <td>#FFFAF0</td>
          <td>255,250,240</td>
        </tr>
        <tr>
          <td bgcolor="#fdf5e6"></td>
          <td>OldLace</td>
          <td>老饰带</td>
          <td>#FDF5E6</td>
          <td>253,245,230</td>
        </tr>
        <tr>
          <td bgcolor="#f5deb3"></td>
          <td>Wheat</td>
          <td>小麦色</td>
          <td>#F5DEB3</td>
          <td>245,222,179</td>
        </tr>
        <tr>
          <td bgcolor="#ffe4b5"></td>
          <td>Moccasin</td>
          <td>鹿皮鞋</td>
          <td>#FFE4B5</td>
          <td>255,228,181</td>
        </tr>
        <tr>
          <td bgcolor="#ffa500"></td>
          <td>Orange</td>
          <td>橙色</td>
          <td>#FFA500</td>
          <td>255,165,0</td>
        </tr>
        <tr>
          <td bgcolor="#ffefd5"></td>
          <td>PapayaWhip</td>
          <td>番木瓜</td>
          <td>#FFEFD5</td>
          <td>255,239,213</td>
        </tr>
        <tr>
          <td bgcolor="#ffebcd"></td>
          <td>BlanchedAlmond</td>
          <td>漂白的杏仁</td>
          <td>#FFEBCD</td>
          <td>255,235,205</td>
        </tr>
        <tr>
          <td bgcolor="#ffdead"></td>
          <td>NavajoWhite</td>
          <td>纳瓦霍白</td>
          <td>#FFDEAD</td>
          <td>255,222,173</td>
        </tr>
        <tr>
          <td bgcolor="#faebd7"></td>
          <td>AntiqueWhite</td>
          <td>古代的白色</td>
          <td>#FAEBD7</td>
          <td>250,235,215</td>
        </tr>
        <tr>
          <td bgcolor="#d2b48c"></td>
          <td>Tan</td>
          <td>晒黑</td>
          <td>#D2B48C</td>
          <td>210,180,140</td>
        </tr>
        <tr>
          <td bgcolor="#deb887"></td>
          <td>BrulyWood</td>
          <td>结实的树</td>
          <td>#DEB887</td>
          <td>222,184,135</td>
        </tr>
        <tr>
          <td bgcolor="#ffe4c4"></td>
          <td>Bisque</td>
          <td>(浓汤)乳脂,番茄等</td>
          <td>#FFE4C4</td>
          <td>255,228,196</td>
        </tr>
        <tr>
          <td bgcolor="#ff8c00"></td>
          <td>DarkOrange</td>
          <td>深橙色</td>
          <td>#FF8C00</td>
          <td>255,140,0</td>
        </tr>
        <tr>
          <td bgcolor="#faf0e6"></td>
          <td>Linen</td>
          <td>亚麻布</td>
          <td>#FAF0E6</td>
          <td>250,240,230</td>
        </tr>
        <tr>
          <td bgcolor="#cd853f"></td>
          <td>Peru</td>
          <td>秘鲁</td>
          <td>#CD853F</td>
          <td>205,133,63</td>
        </tr>
        <tr>
          <td bgcolor="#ffdab9"></td>
          <td>PeachPuff</td>
          <td>桃色</td>
          <td>#FFDAB9</td>
          <td>255,218,185</td>
        </tr>
        <tr>
          <td bgcolor="#f4a460"></td>
          <td>SandyBrown</td>
          <td>沙棕色</td>
          <td>#F4A460</td>
          <td>244,164,96</td>
        </tr>
        <tr>
          <td bgcolor="#d2691e"></td>
          <td>Chocolate</td>
          <td>巧克力</td>
          <td>#D2691E</td>
          <td>210,105,30</td>
        </tr>
        <tr>
          <td bgcolor="#8b4513"></td>
          <td>SaddleBrown</td>
          <td>马鞍棕色</td>
          <td>#8B4513</td>
          <td>139,69,19</td>
        </tr>
        <tr>
          <td bgcolor="#fff5ee"></td>
          <td>SeaShell</td>
          <td>海贝壳</td>
          <td>#FFF5EE</td>
          <td>255,245,238</td>
        </tr>
        <tr>
          <td bgcolor="#a0522d"></td>
          <td>Sienna</td>
          <td>黄土赭色</td>
          <td>#A0522D</td>
          <td>160,82,45</td>
        </tr>
        <tr>
          <td bgcolor="#ffa07a"></td>
          <td>LightSalmon</td>
          <td>浅鲜肉(鲑鱼)色</td>
          <td>#FFA07A</td>
          <td>255,160,122</td>
        </tr>
        <tr>
          <td bgcolor="#ff7f50"></td>
          <td>Coral</td>
          <td>珊瑚</td>
          <td>#FF7F50</td>
          <td>255,127,80</td>
        </tr>
        <tr>
          <td bgcolor="#ff4500"></td>
          <td>OrangeRed</td>
          <td>橙红色</td>
          <td>#FF4500</td>
          <td>255,69,0</td>
        </tr>
        <tr>
          <td bgcolor="#e9967a"></td>
          <td>DarkSalmon</td>
          <td>深鲜肉(鲑鱼)色</td>
          <td>#E9967A</td>
          <td>233,150,122</td>
        </tr>
        <tr>
          <td bgcolor="#ff6347"></td>
          <td>Tomato</td>
          <td>番茄</td>
          <td>#FF6347</td>
          <td>255,99,71</td>
        </tr>
        <tr>
          <td bgcolor="#ffe4e1"></td>
          <td>MistyRose</td>
          <td>薄雾玫瑰</td>
          <td>#FFE4E1</td>
          <td>255,228,225</td>
        </tr>
        <tr>
          <td bgcolor="#fa8072"></td>
          <td>Salmon</td>
          <td>鲜肉(鲑鱼)色</td>
          <td>#FA8072</td>
          <td>250,128,114</td>
        </tr>
        <tr>
          <td bgcolor="#fffafa"></td>
          <td>Snow</td>
          <td>雪</td>
          <td>#FFFAFA</td>
          <td>255,250,250</td>
        </tr>
        <tr>
          <td bgcolor="#f08080"></td>
          <td>LightCoral</td>
          <td>淡珊瑚色</td>
          <td>#F08080</td>
          <td>240,128,128</td>
        </tr>
        <tr>
          <td bgcolor="#bc8f8f"></td>
          <td>RosyBrown</td>
          <td>玫瑰棕色</td>
          <td>#BC8F8F</td>
          <td>188,143,143</td>
        </tr>
        <tr>
          <td bgcolor="#cd5c5c"></td>
          <td>IndianRed</td>
          <td>印度红</td>
          <td>#CD5C5C</td>
          <td>205,92,92</td>
        </tr>
        <tr>
          <td bgcolor="#ff0000"></td>
          <td>Red</td>
          <td>纯红</td>
          <td>#FF0000</td>
          <td>255,0,0</td>
        </tr>
        <tr>
          <td bgcolor="#a52a2a"></td>
          <td>Brown</td>
          <td>棕色</td>
          <td>#A52A2A</td>
          <td>165,42,42</td>
        </tr>
        <tr>
          <td bgcolor="#b22222"></td>
          <td>FireBrick</td>
          <td>耐火砖</td>
          <td>#B22222</td>
          <td>178,34,34</td>
        </tr>
        <tr>
          <td bgcolor="#8b0000"></td>
          <td>DarkRed</td>
          <td>深红色</td>
          <td>#8B0000</td>
          <td>139,0,0</td>
        </tr>
        <tr>
          <td bgcolor="#800000"></td>
          <td>Maroon</td>
          <td>栗色</td>
          <td>#800000</td>
          <td>128,0,0</td>
        </tr>
        <tr>
          <td bgcolor="#ffffff"></td>
          <td>White</td>
          <td>纯白</td>
          <td>#FFFFFF</td>
          <td>255,255,255</td>
        </tr>
        <tr>
          <td bgcolor="#f5f5f5"></td>
          <td>WhiteSmoke</td>
          <td>白烟</td>
          <td>#F5F5F5</td>
          <td>245,245,245</td>
        </tr>
        <tr>
          <td bgcolor="#dcdcdc"></td>
          <td>Gainsboro</td>
          <td>亮灰色</td>
          <td>#DCDCDC</td>
          <td>220,220,220</td>
        </tr>
        <tr>
          <td bgcolor="#d3d3d3"></td>
          <td>LightGrey</td>
          <td>浅灰色</td>
          <td>#D3D3D3</td>
          <td>211,211,211</td>
        </tr>
        <tr>
          <td bgcolor="#c0c0c0"></td>
          <td>Silver</td>
          <td>银白色</td>
          <td>#C0C0C0</td>
          <td>192,192,192</td>
        </tr>
        <tr>
          <td bgcolor="#a9a9a9"></td>
          <td>DarkGray</td>
          <td>深灰色</td>
          <td>#A9A9A9</td>
          <td>169,169,169</td>
        </tr>
        <tr>
          <td bgcolor="#808080"></td>
          <td>Gray</td>
          <td>灰色</td>
          <td>#808080</td>
          <td>128,128,128</td>
        </tr>
        <tr>
          <td bgcolor="#696969"></td>
          <td>DimGray</td>
          <td>暗淡的灰色</td>
          <td>#696969</td>
          <td>105,105,105</td>
        </tr>
        <tr>
          <td bgcolor="#000000"></td>
          <td>Black</td>
          <td>纯黑</td>
          <td>#000000</td>
          <td>0,0,0</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'colorConverter',
  data() {
    return {
      hexValue: '#000000', // hex 输入的值
      hexErrTip: '',
      hexToRgb: '',
      hexToHsl: '',
      hexTemplateColor: '',
      rgbValue: [0, 0, 0],
      rgbErrTip: '',
      rgbToHex: '',
      rgbToHsl: '',
      rgbTemplateColor: '',
      hslValue: [0, 0, 0],
      hslErrTip: '',
      hslToHex: '',
      hslToRgb: '',
      hslTemplateColor: '',
    }
  },
  created() {},
  methods: {
    // HEX转换
    handleHex() {
      if (!this.validateHex(this.hexValue)) {
        this.hexErrTip = '十六进制颜色码为六位或三位！'
        this.hexToRgb = ''
        this.hexTemplateColor = 'transparent'
        this.hexToHsl = ''
      } else {
        this.hexErrTip = ''
        this.hexToRgb = this.hex2Rgb(this.hexValue)
        this.hexTemplateColor = this.hexToRgb
        this.hexToHsl = this.rgb2Hsl(this.hex2Rgb(this.hexValue, true))
      }
    },
    // RGB转换
    handleRgb() {
      let res = this.rgbValue.filter(v => 0 > v || v > 255)
      if (res && res.length) {
        this.rgbErrTip = '数字在0-255之间！'
        this.rgbToHex = ''
        this.rgbTemplateColor = 'transparent'
        this.rgbToHsl = ''
      } else {
        this.rgbErrTip = ''
        this.rgbToHex = this.rgb2Hex(this.rgbValue)
        this.rgbTemplateColor = this.rgbToHex
        this.rgbToHsl = this.rgb2Hsl(this.rgbValue)
      }
    },
    // HSL转换
    handleHsl() {
      if (!this.hslValue[1] < 0 || this.hslValue[1] > 100 || this.hslValue[2] < 0 || this.hslValue[2] > 100) {
        this.hslErrTip = '饱和度和亮度在0-100之间！'
        this.hslToHex = ''
        this.hslToRgb = ''
        this.hslTemplateColor = 'transparent'
      } else {
        this.hslErrTip = ''
        const colorList = this.hsl2rgb(this.hslValue)
        this.hslToHex = this.rgb2Hex(colorList)
        this.hslToRgb = `rgb(${colorList.join(',')})`
        this.hslTemplateColor = `hsl(${this.hslValue[0]},${this.hslValue[1]}%,${this.hslValue[2]}%)`
      }
    },
    // 正则校验hex的值
    validateHex(hex) {
      return /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i.test(hex)
    },
    // 十六进制转为RGB
    hex2Rgb(hex, isArray = false) {
      let rgb = [] // 定义rgb数组
      if (/^#?[0-9A-F]{3}$/i.test(hex)) {
        // 判断传入是否为#三位十六进制数
        let sixHex = '#'
        hex.replace(/[0-9A-F]/gi, kw => {
          sixHex += kw + kw // 把三位16进制数转化为六位
        })
        hex = sixHex //保存回hex
      }
      if (/^#?[0-9A-F]{6}$/i.test(hex)) {
        // 判断传入是否为#六位十六进制数
        hex.replace(/[0-9A-F]{2}/gi, kw => {
          rgb.push(eval('0x' + kw)) // 十六进制转化为十进制并存如数组
          //  rgb.push(parseInt(kw, 16))  // 也行
        })
        if (isArray) {
          return rgb
        } else {
          return `rgb(${rgb.join(',')})` //输出RGB格式颜色
        }
      } else {
        return '十六进制颜色码为六位或三位'
      }
    },
    // RGB转为HSL
    rgb2Hsl(rgb, fixed = 2) {
      let r, g, b
      if (Array.isArray(rgb) && rgb.length === 3) {
        r = rgb[0] / 255
        g = rgb[1] / 255
        b = rgb[2] / 255
      } else {
        return '请输入正确的格式'
      }
      //r /= 255, g /= 255, b /= 255;
      let max = Math.max(r, g, b),
        min = Math.min(r, g, b)
      let h,
        s,
        l = (max + min) / 2

      if (max == min) {
        h = s = 0 // achromatic
      } else {
        let d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
          case g:
            h = (b - r) / d + 2
            break
          case b:
            h = (r - g) / d + 4
            break
        }
        h /= 6
      }
      let H = h * 360
      let S = s * 100
      let L = l * 100
      return 'hsl(' + this.toFixed(H, fixed) + ',' + this.toFixed(S, fixed) + '%,' + this.toFixed(L, fixed) + '%)'
    },
    // RGB转为十六进制
    rgb2Hex(rgb) {
      if (rgb && rgb.length === 3) {
        let res = '#'
        for (let i = 0, len = rgb.length; i < len; i++) {
          let hex = Number(rgb[i])
            .toString(16)
            .toLocaleUpperCase()
          if (hex.length < 2) {
            hex = '0' + hex
          }
          res += hex
        }
        if (res.length !== 7) {
          res = rgb
        }
        return res
      } else {
        return '请输入正确的格式'
      }
    },
    // HSL转为RGB
    hsl2rgb(hsl) {
      let h, s, l
      if (hsl && hsl.length === 3) {
        h = Number(hsl[0]) / 360
        s = Number(hsl[1]) / 100
        l = Number(hsl[2]) / 100
      }
      // let h = H/360;
      //let s = S/100;
      //let l = L/100;
      let r, g, b
      if (s == 0) {
        r = g = b = l // achromatic
      } else {
        let hue2rgb = function hue2rgb(p, q, t) {
          if (t < 0) t += 1
          if (t > 1) t -= 1
          if (t < 1 / 6) return p + (q - p) * 6 * t
          if (t < 1 / 2) return q
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
          return p
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s
        let p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
    },
    // 保留小数点
    toFixed(n, fixed = 2) {
      return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed)
    },
  },
}
</script>
<style lang="scss" scoped>
.color-converter {
  width: 1000px;
  margin: 0 auto;
  padding-bottom: 16px;
}
.color-list {
  width: 100%;
  height: 240px;
  display: flex;
  justify-content: space-around;
  &-item {
    width: 250px;
    text-align: left;
    &_name {
      font-size: 24px;
    }
    &_input {
      height: 64px;
      &_tip {
        color: red;
        font-size: 12px;
        margin-top: 6px;
      }
    }
    &_input_list {
      display: flex;
    }
    &_input_value {
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      outline: 0;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      width: 100%;
      &:focus {
        border-color: #409eff;
      }
      &::placeholder {
        color: #c0c4cc;
      }
    }
    &_button {
      padding: 8px 16px;
      color: #fff;
      border-radius: 3px;
      background-color: #409eff;
      display: inline-block;
      cursor: pointer;
      border: 1px solid #409eff;
      font-weight: 500;
      font-size: 12px;
      outline: none;
      &:hover {
        background-color: #66b1ff;
        border-color: #66b1ff;
      }
    }
    &_show {
      width: 100%;
      height: 32px;
      line-height: 32px;
      font-size: 18px;
      color: #606266;
      &_name {
        color: #909399;
        display: inline-block;
        width: 48px;
      }
    }
    &_template {
      width: 100%;
      height: 32px;
    }
  }
  .my_m_rl_8 {
    margin-left: 8px;
    margin-right: 8px;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>