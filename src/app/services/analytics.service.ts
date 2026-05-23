import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {

  init(): void {
    // Initialize the digitalData layer BEFORE loading any script
    (window as any).digitalData = {
      page: { pageInfo: { pageId: '' } }
    };

    //  // Load the real Adobe Launch script
    //  const script = document.createElement('script');
    //  script.src = 'https://assets.adobedtm.com/your-real-launch-script.min.js'; // ← replace this
    //  script.async = true;
    //  document.head.appendChild(script);


    // Initialize mock s object (simulates Adobe Analytics)
    (window as any).s = {
      pageName: '',
      eVar1: '',
      prop1: '',
      t: () => {
        console.log('%c[Adobe Analytics] Page View fired', 'color: #FF6B00; font-weight:bold', {
          pageName: (window as any).s.pageName,
          eVar1: (window as any).s.eVar1,
        });
      },
      tl: (_obj: any, _type: string, linkName: string) => {
        console.log('%c[Adobe Analytics] Custom Event fired', 'color: #1473E6; font-weight:bold', {
          linkName,
          prop1: (window as any).s.prop1,
        });
      }
    };

    // Mock _satellite (Adobe Launch)
    (window as any)._satellite = {
      track: (eventName: string, data?: any) => {
        console.log('%c[Adobe Launch] _satellite.track()', 'color: #9B59B6; font-weight:bold', {
          eventName, data
        });
      }
    };

    console.log('%c[Adobe Analytics] Initialized ✓', 'color: green; font-weight:bold');
  }

  trackPageView(pageName: string): void {
    const s = (window as any).s;
    if (s) {
      s.pageName = pageName;
      s.t();
    }
  }

  trackEvent(eventName: string, data?: any): void {
    const satellite = (window as any)._satellite;
    if (satellite) {
      satellite.track(eventName, data);
    }
  }

  trackLinkClick(linkName: string): void {
    const s = (window as any).s;
    if (s) {
      s.prop1 = linkName;
      s.tl(true, 'o', linkName);
    }
  }
}