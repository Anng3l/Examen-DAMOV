import { TestBed } from '@angular/core/testing';

import { supabaseService } from './supabase.service';

describe('SupabaseService', () => {
  let service: supabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(supabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
