// Strategy Pattern Example

// Assume we need to send Alerts to users

// Eg:
// const NotifyAlertByEmail = (message: string) => { ... logics ... };
// const NotifyAlertBySMS = (message: string) => { ... logics ... };

// The code looks like:

// class AlertService {
//   constructor(private configService: IConfigService, private emailService: IEmailService, private smsService: ISMSService) {
//     this.configService = configService;
//     this.emailService = emailService;
//     this.smsService = smsService;
//   }

//   sendAlert(message: string) {
//     const configs = this.configService.getConfig();

//     if(configs.type === 'email') {
//       const subject = configs.subject + " - " + configs.type;
//       this.emailService.send(subject, message);
//     } else if(configs.type === 'sms') {
//       const subject = configs.subject + " ### " + configs.type;

//       if (configs.isValidPhoneNumber) {
//         const phoneNumber = convertToPhoneNumberHelper(configs.phoneNumber);
//         this.smsService.send(subject, message, phoneNumber);
//       } else {
//         this.smsService.send(subject, message);
//       }
//     }
//   }
// }

// As you can see from above code example, we have if, else if, which is not good practice, because later on, if we have more ways to send alerts, we will have more else if statements, which will make the code more complex and harder to maintain. 

// So in this case, we need to consider to use strategy pattern

// Strategy Pattern is a behavioral design pattern that allows you to define a family of algorithms, encapsulate each algorithm, and make them interchangeable. It lets the algorithm vary independently from clients that use it.

// We can use the Strategy Pattern to solve this problem

// 1. 定义策略接口
const convertToPhoneNumberHelper = (phoneNumber: string) => { // Just Example
  return phoneNumber;
}

class ConfigService { // Just Example
  constructor() {}

  getConfig() {
    return {
      subject: "Alert",
      type: "email",
      isValidPhoneNumber: true,
      phoneNumber: "1234567890",
    };
  }
}

class EmailService { // Just Example
  constructor() {}

  send(subject: string, message: string) {
    console.log(`Sending email: ${subject} - ${message}`);
  }
}

class SMSService { // Just Example
  constructor() {}

  send(subject: string, message: string, phoneNumber?: string) {
    console.log(`Sending SMS: ${subject} - ${message} to ${phoneNumber}`);
  }
}

interface AlertStrategy {
  notify(message: string): void;
}

// 2. 实现具体的邮件策略
class EmailAlertWithStrategy implements AlertStrategy {
  constructor(private configService: ConfigService, private emailService: EmailService) {}

  notify(message: string): void {
    const configs = this.configService.getConfig();
    const subject = configs.subject + " - " + configs.type;

    this.emailService.send(subject, message);
  }
}

// 3. 实现具体的短信策略
class SMSAlertWithStrategy implements AlertStrategy {
  constructor(private configService: ConfigService, private smsService: SMSService) {}

  notify(message: string): void {
    const configs = this.configService.getConfig();
    const subject = configs.subject + " ### " + configs.type;
    
    if (configs.isValidPhoneNumber) {
      const phoneNumber = convertToPhoneNumberHelper(configs.phoneNumber);

      this.smsService.send(subject, message, phoneNumber);
    } else {
      this.smsService.send(subject, message);
    }
  }
}

// 4. 修改AlertService，使用注入的策略
class AlertService {
  private strategy: AlertStrategy;

  constructor(strategy: AlertStrategy) {
    this.strategy = strategy;
  }

  // 允许动态切换策略
  setStrategy(strategy: AlertStrategy) {
    this.strategy = strategy;
  }

  sendAlert(message: string) {
    this.strategy.notify(message);
  }
}

// 使用示例
const configService = new ConfigService();
const emailService = new EmailService();
const smsService = new SMSService();

// 创建不同的策略
const emailStrategy = new EmailAlertWithStrategy(configService, emailService);
const smsStrategy = new SMSAlertWithStrategy(configService, smsService);

// 创建服务并指定初始策略
const alertService = new AlertService(emailStrategy);

// 发送提醒
alertService.sendAlert("这是一条重要通知");

// 如果需要切换策略
alertService.setStrategy(smsStrategy);
alertService.sendAlert("这是另一条重要通知");
